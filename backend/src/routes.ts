import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import { Round } from "./db/entities/Rounds.js";
import {ICreateUsersBody} from "./types.js";

async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	

	
	// Core method for adding generic SEARCH http method
	// app.route<{Body: { email: string}}>({
	// 	method: "SEARCH",
	// 	url: "/users",
	//
	// 	handler: async(req, reply) => {
	// 		const { email } = req.body;
	//
	// 		try {
	// 			const theUser = await req.em.findOne(User, { email });
	// 			console.log(theUser);
	// 			reply.send(theUser);
	// 		} catch (err) {
	// 			console.error(err);
	// 			reply.status(500).send(err);
	// 		}
	// 	}
	// });
	
	// CRUD
	// C
	app.post<{Body: ICreateUsersBody}>("/users", async (req, reply) => {
		const { name, email} = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				name,
				email
			});

			await req.em.flush();
			
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
	
	//READ
	app.search("/users", async (req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	// UPDATE
	app.put<{Body: ICreateUsersBody}>("/users", async(req, reply) => {
		const { name, email} = req.body;
		
		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		
		
		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
		
	});
	
	// DELETE
	app.delete<{ Body: {email}}>("/users", async(req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			
			await req.em.remove(theUser).flush();
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});


    ////////////////////////////////////////////////////////////
	// Round Add
	app.post<{Body: { user: string, course: string, scorecard: number[][] }}>("/game", async (req, reply) => {
		const { user, course, scorecard} = req.body;
		
		try {

			// make sure that the matchee exists & get their user account
			const player = await req.em.findOne(User, { email: user });

			//create a new match between them
			const newGame = await req.em.create(Round, {
				player,
				course,
				scorecard
			});

			//persist it to the database
			await req.em.flush();
			// send the match back to the user
			return reply.send(newGame);
		} catch (err) {
			console.error(err);
			return reply.status(500).send(err);
		}

	});
    // GET GAMES
	app.get("/game", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(Round, {});
	});
	
}

export default DoggrRoutes;

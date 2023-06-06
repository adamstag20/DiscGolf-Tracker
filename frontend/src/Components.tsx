import { courses } from "./assets/Maps";
import { Link } from "react-router-dom";
import './styles/Auth.css'
import { useState } from "react";
import { auth} from "./firebase"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import axios from 'node_modules/axios/index';

export const AuthPage = ({setUser}) => {

	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [create, setCreate] = useState(false);

	const signUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log(userCredential)
			axios.post('http://0.0.0.0:8080/users',{
				name: `${first} ${last}`,
				email: `${email}`
			})
		}).catch((error)=> {
			console.log(error)
		})

	}
	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Snag email 
			console.log(userCredential.user.email)
			console.log(userCredential)
			axios.request({
				url: 'http://0.0.0.0:8080/users',
				method: 'search',
				data: {
					email: `${userCredential.user.email}`
				}
			}) 
			.then(response => {
				console.log(response.data.id);
				setUser(response.data.id)
		
			  })
			  .catch(error => {
				console.log(error.response.data)
				return error;
			  });
		}).catch((error)=> {
			console.log(error)
		})

	}
	return(
		<div className="auth">
			{ create ? (
				<form onSubmit={signUp}>
				<h1>Create an Account</h1>
				<input 
				type="text" 
				placeholder="Enter your First Name" 
				value={first}
				onChange={((e)=> setFirst(e.target.value))}
				></input>
				<input 
				type="text" 
				placeholder="Enter your Last Name" 
				value={last}
				onChange={((e)=> setLast(e.target.value))}
				></input>
				<input 
				type="email" 
				placeholder="Enter your email" 
				value={email}
				onChange={((e)=> setEmail(e.target.value))}
				></input>
				<input 
				type="password" 
				placeholder="Enter your password" 
				value={password}
				onChange={((e)=> setPassword(e.target.value))}
				></input>
				<button type="submit">Sign Up</button>
				<text onClick={() => setCreate(false)}>Back to login</text>
			</form>
			):(
				<form onSubmit={signIn}>
				<h1>Log in!</h1>
				<input 
				type="email" 
				placeholder="Enter your email" 
				value={email}
				onChange={((e)=> setEmail(e.target.value))}
				></input>
				<input 
				type="password" 
				placeholder="Enter your password" 
				value={password}
				onChange={((e)=> setPassword(e.target.value))}
				></input>
				<button type="submit">Log In</button>
				<text onClick={() => setCreate(true)}>Create an account</text>
			</form>
			)}

		</div>
	);
};

export const Home = () => {
	return (
		<div>
		<h1>Select a Course:</h1>
		<div className="courseView">
			{
				courses.map( (course: {course_name: string, difficulty: string}) =>
				<div className = "course" key={course.course_name}>
				<Link clasName = "course-link" to={`/start/${course.course_name}`}>
					<h2> {course.course_name} </h2>
					<h4> {course.difficulty} </h4>
				</Link>
				</div>
				
				)
			}
		</div>
		</div>
	);
};

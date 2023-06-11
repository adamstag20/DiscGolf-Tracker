import { courses } from "./assets/Maps";
import { Link } from "react-router-dom";
import './styles/Auth.css'
import { useState } from "react";
import { auth } from "./firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'node_modules/axios/index';


export const AuthPage = ({ setUser }) => {

	async function searchUser(email) {

		console.log("Hi here")
		await axios.request({
			url: 'http://0.0.0.0:8080/users',
			method: 'search',
			data: {
				email: `${email}`
			}
		})
			.then(response => {
				console.log(response.data.id);
				sessionStorage.setItem('items', JSON.stringify(response.data.id));
				return (response.data.id);

			})
			.catch(error => {
				console.log(error.response.data)
				return error;
			});
		return null;
	}

	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [create, setCreate] = useState(false);

	function signUp(e) {
		let grabEmail = email;
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential)
				axios.post('http://0.0.0.0:8080/users', {
					name: `${first} ${last}`,
					email: `${email}`
				})
			}).catch((error) => {
				console.log(error)
			})
			setCreate(false)

	}
	function signIn(e) {
		let grabEmail = null;
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Snag email 
				grabEmail = userCredential.user.email;
				console.log(userCredential)
				grabUser(grabEmail)

			}).catch((error) => {
				console.log(error)
			})

	}

	function grabUser(email) {
		const user = searchUser(email)
			if (user) { 
				console.log("Email ->", email);
				setUser(user) }
	}
	return (
		<div className="auth">
			{create ? (
				<form onSubmit={signUp}>
					<h1>Create an Account</h1>
					<input
						type="text"
						placeholder="Enter your First Name"
						value={first}
						onChange={((e) => setFirst(e.target.value))}
					></input>
					<input
						type="text"
						placeholder="Enter your Last Name"
						value={last}
						onChange={((e) => setLast(e.target.value))}
					></input>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={((e) => setEmail(e.target.value))}
					></input>
					<input
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={((e) => setPassword(e.target.value))}
					></input>
					<button type="submit">Sign Up</button>
					<text onClick={() => {setCreate(false)
					setEmail('')
					setPassword('')}}>Back to login</text>
				</form>
			) : (
				<form onSubmit={signIn}>
					<h1>Log in!</h1>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={((e) => setEmail(e.target.value))}
					></input>
					<input
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={((e) => setPassword(e.target.value))}
					></input>
					<button type="submit">Log In</button>
					<text onClick= {() => {setCreate(true)
					setEmail('')
					setPassword('')}}>Create an account</text>
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
					courses.map((course: { course_name: string, difficulty: string }) =>
						<div className="course" key={course.course_name}>
							<Link className="course-link" to={`/start/${course.course_name}`}>
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

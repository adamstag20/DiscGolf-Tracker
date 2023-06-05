import { courses } from "./assets/Maps";
import { Link } from "react-router-dom";
import './styles/Course.css'
import { useState } from "react";
import { auth} from "./firebase"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";

export const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log(userCredential)
		}).catch((error)=> {
			console.log(error)
		})

	}
	return(
		<div>
			<form onSubmit={signIn}>
				<h1>LOGIN</h1>
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
			</form>
		</div>
	);
};

export const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log(userCredential)
		}).catch((error)=> {
			console.log(error)
		})

	}
	return(
		<div>
			<form onSubmit={signUp}>
				<h1>Create an Account</h1>
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
			</form>
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

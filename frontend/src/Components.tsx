import { courses } from "./assets/Maps";
import './styles/Course.css'

export const Match = () => {
	return(
		<div>"MATCH PAGE"</div>
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
					<h2> {course.course_name} </h2>
					<h4> {course.difficulty} </h4>
					 
				</div>
				
				)
			}
		</div>
		</div>
	);
};

export function Title() {
	return(<h1>Doggr</h1>);
}

export function Subtitle() {
	return(<h3>Where your pets find love(tm)</h3>);
}
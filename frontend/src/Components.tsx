import { courses } from "./assets/Maps";
import { Link } from "react-router-dom";
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

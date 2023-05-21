import React from 'react';
import { useParams } from "react-router-dom";
import { courses } from './assets/Maps';

function getCourse(name: string){
    for (let i = 0; i < courses.length; i++){
        if (courses[i].course_name === name){return courses[i]}
    }
    return null;
}
function StartGame() {
  const mapName = useParams();
  const course = getCourse(mapName.id);
  return (
    <div>
        <h1>{course.course_name}</h1>
    </div>
  )
}

export default StartGame;
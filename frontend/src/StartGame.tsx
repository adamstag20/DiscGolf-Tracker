import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { courses } from './assets/Maps';
import "./styles/Course.css"

function getCourse(name: string){
    for (let i = 0; i < courses.length; i++){
        if (courses[i].course_name === name){return courses[i]}
    }
    return null;
}

function getPar(course){
    let amount = 0;
    for (let i = 0; i < course.holes.length; i++){
        amount += course.holes[i];
    }
    return amount;
}

function StartGame() {

  const mapName = useParams();
  const course = getCourse(mapName.id);
  const par = getPar(course);

  const[start,setStart] = useState(false);

  function startGame(){
    setStart(true);
}

  return (
        <div className ="courseView">
      { !start ? (
          <div>
        <h1 className = "start-header">{course.course_name}</h1>
        <h3>{course.description}</h3>
        <h2 className = "start-header">Par {par} Course</h2>
        <h2 className = "start-header"> Personal Best: 65</h2>
        <div onClick= {startGame} className="start-button">
            Start Game
        </div>
        </div>
      ):(
          <div>HAHAHAHHAHA</div>

      )
      }
    </div> 
  )
}

export default StartGame;
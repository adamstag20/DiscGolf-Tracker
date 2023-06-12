import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { courses } from './assets/Maps';
import "./styles/Course.css"
import axios from 'node_modules/axios/index';
import GamePlay from './GamePlay';


function getCourse(name: string) {
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].course_name === name) { return courses[i] }
  }
  return null;
}

function getPar(course) {
  let amount = 0;
  for (let i = 0; i < course.holes.length; i++) {
    amount += course.holes[i];
  }
  return amount;
}

// Finds users average shot per hole
function getAverages(games,course){
  let averages = [];
  for (let i=0; i < course.holes.length; i++){
    let amount = 0;
    for (let j=0; j <games.length; j++){
      amount += Number(games[j].scorecard[i][0]);
    }
    let avg = Math.round(amount / games.length);
    averages = [...averages, avg];
  }
  return averages;
}



function StartGame({token}) {

  const items = JSON.parse(sessionStorage.getItem('items'));

  const [start, setStart] = useState(false);
  const [best, setBest] = useState(0);
  const [averages, setAverages] = useState([]);
  const [games, setGames] = useState([]);
  const [mapName, setMapName]= useState(useParams())
  const [course, setCourse] = useState(getCourse(mapName.id))

  const par = getPar(course);

  useEffect(()=>{
        startGame();

  },[])

  function handleStart(){
    setStart(true);
  }

  function getBest(games){
    let smallest = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < games.length; i++){
      let amount = 0;
      if (games[i].course == course.course_name){
        for (let j = 0; j < games[i].scorecard.length;j++){
            amount += Number(games[i].scorecard[j][0]);
          }
      }
      if (smallest >= amount && amount != 0){ smallest = amount;}
    }
      if (smallest >= 300 || smallest == 0){
        return null;
      }
      return smallest;
  }

  async function startGame() {
    const games = await axios.request({
			url: 'http://0.0.0.0:8080/game',
			method: 'search',
			data: {
				player: `${items}`
			}
		})
      .then(response => {
        return response.data;

      })
      .catch(error => {
        console.log(error.response.data)
        return error;
      });
    //console.log(gamesList);A
    setGames(games);
    setAverages(getAverages(games,course));
    setBest(getBest(games));

  }

  return (
    <div className="courseView">
      {!start ? (
        <div>
          <h1 className="start-header">{course.course_name}</h1>
          <h3>{course.description}</h3>
          <h2 className="start-header">Par {par} Course</h2>
          <h2 className="start-header"> Personal Best: {best}</h2>
          <div onClick= {handleStart} className="start-button">
            Start Game
          </div>
        </div>
      ) : (
        <GamePlay
        course = {course}
        averages = {averages}
        games = {games}
        />

      )
      }
    </div>
  )
}

export default StartGame;
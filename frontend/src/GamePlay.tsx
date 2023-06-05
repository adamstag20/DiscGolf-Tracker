import React, { useEffect, useState } from 'react'
import "./styles/Course.css"
import axios from 'node_modules/axios/index';
import FinishGame from './FinishGame';

function GamePlay({ course, averages, games }) {

    const [hole, setHole] = useState(1);
    const [strokes, setStrokes] = useState(0);
    const [best, setBest] = useState(0);
    const [worst, setWorst] = useState(0);
    const [scorecard, setScorecard] = useState([]);
    const [lastHole, setLastHole] = useState(false);
    const [displayScore, setDisplayScore] = useState(false);

    useEffect(() => {
        setWorstAndBest();
    }, [hole])

    function setWorstAndBest() {
        let smallest = Number.MAX_SAFE_INTEGER;
        let largest = Number.MIN_SAFE_INTEGER;
        for (let j = 0; j < games.length; j++) {
            if (smallest >= games[j].scorecard[hole][0]) {
                smallest = games[j].scorecard[hole][0];
            }
            if (largest <= games[j].scorecard[hole][0]) {
                largest = games[j].scorecard[hole][0];
            }
            setBest(smallest);
            setWorst(largest);

        }
    }

    function incrementStroke() {
        const val = strokes + 1;
        setStrokes(val);
    }
    function decrementStroke() {
        const val = strokes - 1;
        setStrokes(val);
    }

    function nextHole() {
        const toAdd = [...scorecard, [strokes, course.holes[hole]]];
        setScorecard(toAdd);
        if (course.holes.length == hole + 1) {
            setLastHole(true)
        }
        setHole(hole + 1);
        setStrokes(0);


    }
    function finishGame() {
        const toAdd = [...scorecard, [strokes, course.holes[hole]]];
        setScorecard(toAdd);
        // Make post to backend
        axios.post(`http://0.0.0.0:8080/game`, {
            user: 'wadam935@gmail.com',
            course: `${course.course_name}`,
            scorecard: scorecard
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        setDisplayScore(true);
    }
    return (
        <div>
            {!displayScore ? (
                <div>
                    <h1 className="start-header">{course.course_name}</h1>
                    <h2 className="start-header">Hole {hole}</h2>
                    <h3 className="start-header">Par {course.holes[hole]}</h3>
                    <h2 className="start-header">Best {best}</h2>
                    <h2 className="start-header">Worst {worst}</h2>
                    <div className="incrementer">
                        <div className="stroke">{strokes}</div>
                        <button onClick={decrementStroke}>-</button>
                        <button onClick={incrementStroke}>+</button>
                    </div>
                    {!lastHole ? (
                        <div onClick={nextHole} className="next-button">
                            Next Hole
                        </div>
                    ) : (
                        <div onClick={finishGame} className="finish-button">
                            Finish Game
                        </div>
                    )}
                </div>
            ) : (
                <FinishGame
                course = {course}
                scorecard = {scorecard} />
            )}

        </div>
    )
}

export default GamePlay
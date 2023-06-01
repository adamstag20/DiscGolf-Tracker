import React, { useEffect, useState } from 'react'
import "./styles/Course.css"

function GamePlay({ course, averages, games }) {

    const [hole, setHole] = useState(1);
    const [strokes, setStrokes] = useState(0);
    const [best, setBest] = useState(0);
    const [worst, setWorst] = useState(0);

    useEffect(() => {
        setWorstAndBest(games, course, hole);
    }, [])

    function setWorstAndBest(games, course, hole) {
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
    return (
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
        </div>
    )
}

export default GamePlay
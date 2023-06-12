import React, { useEffect, useState } from 'react'
import "./styles/Course.css"

function FinishGame({ course, scorecard }) {

  const [birdieRate, setBirdieRate] = useState<any | null>(0);
  const [parRate, setParRate] = useState<any | null>(0);
  const [bogeyRate, setBogeyRate] = useState<any | null>(0);

  function getRoundPercentage(shotType) {
    let count = 0;
    console.log(scorecard)
    for (let i = 0; i < scorecard.length; i++) {
      if (shotType == 1) {
        if (scorecard[i][0] < (scorecard[i][1])) {
          count++;
        }
      }
      if (shotType == -1) {
        if (scorecard[i][0] > (scorecard[i][1])) {
          count++;
        }
      }
      if (shotType == 0) {
        if (scorecard[i][0] == (scorecard[i][1])) {
          count++;
        }

      }
    }
    console.log("COUNT -> ", count)
    let percent = ((count*100) / scorecard.length).toFixed(2);

    return percent;

  }
  useEffect(() => {
    setBirdieRate(getRoundPercentage(1))
    setParRate(getRoundPercentage(0))
    setBogeyRate(getRoundPercentage(-1))

  })

  return (
    <div>
      <h1 className="start-header">{course.course_name}</h1>
      <div className='grid-score'>
        <h2 className="birdie">Birdie % : {birdieRate}</h2>
        <h2 className="par">Par % : {parRate}</h2>
        <h2 className="bogey">Bogey % : {bogeyRate}</h2>
      </div>
    </div>
  )
}

export default FinishGame
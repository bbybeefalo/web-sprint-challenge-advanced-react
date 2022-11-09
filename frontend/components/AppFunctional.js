import React from 'react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [activeSq, setActiveSq] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  function countSteps () {
    setSteps(steps + 1);
  }

  function reset (evt) {
    evt.preventDefault();
    setSteps(initialSteps);
    setActiveSq(initialIndex);
  }


  function move (evt) {
    let direction = evt.target.id; 
    if (direction === "down" && activeSq < 6) {
      setActiveSq(activeSq + 3);
      countSteps();
    } else if (direction === "up" && activeSq > 2) {
      setActiveSq(activeSq - 3);
      countSteps();
    } else if (direction === "left" && activeSq !== 0 ) {
      setActiveSq(activeSq - 1);
      countSteps();
    } else if (direction === "right") {
      setActiveSq(activeSq + 1);
      countSteps();
    }
    console.log(activeSq)
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 
           3, 4, 5,
           6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === activeSq ? ' active' : ''}`}>
              {idx === activeSq ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

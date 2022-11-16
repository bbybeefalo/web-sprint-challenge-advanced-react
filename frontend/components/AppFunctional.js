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
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);


  function countSteps() {
    setSteps(steps + 1);
  }

  function reset(evt) {
    evt.preventDefault();
    setSteps(initialSteps);
    setActiveSq(initialIndex);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }


  function move(evt) {
    evt.preventDefault();
    let direction = evt.target.id;
    if (direction === "down" && activeSq < 6) {
      setActiveSq(activeSq + 3);
      countSteps();
      setMessage(initialMessage)
     
    } else if (direction === "down" && activeSq >= 6) {
      setMessage(`You can't go down`);

    } else if (direction === "up" && activeSq > 2) {
      setActiveSq(activeSq - 3);
      countSteps();
      setMessage(initialMessage);

    } else if (direction === "up" && activeSq <= 2) {
      setMessage(`You can't go up`);

    } else if (direction === "left" && activeSq !== 0 && activeSq !== 3 && activeSq !== 6) {
      setActiveSq(activeSq - 1);
      countSteps();
      setMessage(initialMessage);
   
    } else if (direction === "left" && activeSq === 0 || activeSq === 3 || activeSq === 6) {
      setMessage(`You can't go left`);

    } else if (direction === "right" && activeSq !== 2 && activeSq !== 5 && activeSq !== 8) {
      setActiveSq(activeSq + 1);
      countSteps();
      setMessage(initialMessage);
      
    } else if (direction === "right" && activeSq === 2 || activeSq === 5 || activeSq === 8) {
      setMessage(`You can't go right`);
    }
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ()</h3>
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
        <h3 id="message">{message}</h3>
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

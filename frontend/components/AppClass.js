import axios from 'axios'
import e from 'cors'
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

let y = 2;
let x = 2;

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  count = () => {
    this.setState({ steps: this.state.steps + 1 });
  }

  reset = () => {
    this.setState({ ...initialState });
  }

  move = (evt) => {
    evt.preventDefault();
    let direction = evt.target.id;
    if (direction === "down" && (this.state.index < 6)) {
      this.setState({ index: this.state.index + 3, message: initialMessage })
      this.count();
    } else if (direction === "down" && this.state.index >= 6) {
      this.setState({ message: `You can't go down` });

    } else if (direction === "up" && this.state.index > 2) {
      this.setState({ index: this.state.index - 3 });
      this.count();
      this.setState({ message: initialMessage });
    } else if (direction === "up" && this.state.index <= 2) {
      this.setState({ message: `You can't go up` });

    } else if (direction === "left" && this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6) {
      this.setState({ index: this.state.index - 1, message: initialMessage });
      this.count();
    } else if (direction === "left" && (this.state.index === 0 || this.state.index === 3 || this.state.index === 6)) {
      this.setState({ message: `You can't go left` });

    } else if (direction === "right" && this.state.index !== 2 && this.state.index !== 5 && this.state.index !== 8) {
      this.setState({ index: this.state.index + 1, message: initialMessage });
      this.count();
    } else if (direction === "right" && this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
      this.setState({ message: `You can't go right` });
    }
  };


  Y = (sq) => {
    if (sq === 0 || sq === 1 || sq === 2) {
      y = 1
    } else if (sq === 3 || sq === 4 || sq === 5) {
      y = 2
    } else {
      y = 3
    }
    return y
  }
  X = (sq) => {
    if (sq === 0 || sq === 3 || sq === 6) {
      x = 1
    } else if (sq === 1 || sq === 4 || sq === 7) {
      x = 2
    } else {
      x = 3
    }
    return x
  }

  change = (evt) => {
    this.setState({email: evt.target.value})
  }

  submit = (evt) => {
    evt.preventDefault();
    const info = {
      x: this.X(this.state.index),
      y: this.Y(this.state.index),
      steps: this.state.steps,
      email: this.state.email
    }
    console.log(info)
    axios.post('http://localhost:9000/api/result', info)
    .then(res => {
      this.setState({message: res.data.message})
    })
    .catch(err => {
      this.setState({message: err.response.data.message})
    })
    
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.X(this.state.index)}, {this.Y(this.state.index)})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2,
              3, 4, 5,
              6, 7, 8].map(idx => (
                <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                  {idx === this.state.index ? 'B' : null}
                </div>
              ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.change}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

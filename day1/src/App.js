import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      bearing: 0,
      location: [0, 0]
    };
  }

  componentDidMount() {
    fetch("./input.txt")
    .then(res => res.text())
    .then(data => {
      data.split(', ')
      .map(instruction => this.move(instruction));
    })
  }

  move(instruction) {
    const turn = (instruction[0] === "L" ? -1 : 1);
    const newBearing = (this.state.bearing + turn + 4) % 4
    const blocks = parseInt(instruction.substring(1), 10);
    let location = this.state.location;

    switch(newBearing) {
      case 0:
        location[0] += blocks;
        break;
      case 1:
        location[1] += blocks;
        break;
      case 2:
        location[0] -= blocks;
        break;
      case 3:
        location[1] -= blocks;
        break;
      default:
    }

    console.log("inst: " + instruction + " turn: " + turn + " newBearing: " + newBearing + " location: " + location);
    this.setState({bearing: newBearing, location: location});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
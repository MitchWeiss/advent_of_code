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
    
    console.log("inst: " + instruction + " turn: " + turn + " newBearing: " + newBearing);

    this.setState({bearing: newBearing});
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
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3]; // Assign integer values for each direction
const [LEFT, RIGHT] = [-1, 1]; // Left turn will decrease the direction integer, opposite for right turn

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      bearing: NORTH,
      x: 0,
      y: 0,
      distance: null
    };
  }

  componentDidMount() {
    fetch("./input.txt")
    .then(res => res.text())
    .then(data => {
      data.split(', ').map(instruction => this.move(instruction));
      this.calculateDistance();
    });
  }

  calculateDistance() {
    let {x, y} = this.state;
    this.setState({ distance: Math.abs(x) + Math.abs(y) });
  }

  move(instruction) {
    const turn = (instruction[0] === "L" ? LEFT : RIGHT);
    const bearing = (this.state.bearing + turn + 4) % 4;
    const blocks = parseInt(instruction.substring(1), 10);
    let {x, y} = this.state;

    switch(bearing) {
      case NORTH:
        x += blocks;
        break;
      case EAST:
        y += blocks;
        break;
      case SOUTH:
        x -= blocks;
        break;
      case WEST:
        y -= blocks;
        break;
      default:
    }

    this.setState({bearing: bearing, x: x, y: y});
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
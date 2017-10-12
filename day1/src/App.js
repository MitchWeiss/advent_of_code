import React, { Component } from 'react';
import Direction from './Direction';
import { Line } from 'rc-progress';
import './App.css';

const [NORTH, EAST, SOUTH, WEST] = [0, 1, 2, 3]; // Assign integer values for each direction
const [LEFT, RIGHT] = [-1, 1]; // Left turn will decrease the direction integer, opposite for right turn

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      distance: null,
      instructions: null,
      bearing: NORTH,
      x: 0,
      y: 0,
      blocks: 0,
      currentMove: 0
    };
  }

  componentDidMount() {
    fetch("./input.txt")
    .then(res => res.text())
    .then(data => {
      const instructions = data.split(', ');
      this.setState({ instructions, loading: false });
      this.followInstructions();
    });
  }

  calculateDistance() {
    let { x, y } = this.state;
    this.setState({ distance: Math.abs(x) + Math.abs(y) });
  }

  followInstructions() {
    const { currentMove, instructions } = this.state;
    this.move(instructions[currentMove]);
    this.setState({ currentMove: currentMove+1 });
    if(currentMove < instructions.length - 1) {
      setTimeout(this.followInstructions.bind(this), 150);
    } else {
      this.calculateDistance();
    }
  }

  move(instruction) {
    const turn = (instruction[0] === "L" ? LEFT : RIGHT);
    const bearing = (this.state.bearing + turn + 4) % 4;
    const blocks = parseInt(instruction.substring(1), 10);
    let { x, y } = this.state;

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
    this.setState({bearing, blocks, x, y});
  }

  render() {
    const { loading, currentMove, bearing, blocks, instructions, distance } = this.state
    const percent = instructions ? Math.floor((currentMove/instructions.length)*100) : 0;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Easter Bunny Hunt!</h1>
        </header>
        { loading && <h2>Tracking him down now!</h2> }
        { !loading && <div className="loader"><Line percent={percent} strokeWidth={4} trailWidth={4} /></div> }
        { !loading && percent !== 100 && <Direction bearing={bearing} blocks={blocks} /> }
        { distance && <h2>Found him! He's <span className="distance">{distance}</span> blocks away!!!</h2> }
        
      </div>
    );
  }
}

export default App;
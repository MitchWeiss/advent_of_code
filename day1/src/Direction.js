import React from 'react';
import './Direction.css';

const bearings = {
  0: "North",
  1: "East",
  2: "South",
  3: "West"
}

export default (props) => {
  const bearing = bearings[props.bearing];
  return (
    <div className="direction">
      <h2>Currently moving <span className="bearing">{bearing}</span> for <span className="blocks">{props.blocks}</span> blocks</h2>
    </div>
  );
}
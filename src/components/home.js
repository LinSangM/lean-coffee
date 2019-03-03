import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Lean Coffee</h1>
        <Link to={"/room"}>
          <button>
            Start
            </button>
        </Link>
      </div>
    );
  }
}
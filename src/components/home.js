import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
        <div>
            <h1>Lean Coffee</h1>
            <button>
              <Link to={"/room"}>Start</Link>
            </button>
        </div>
    );
  }
}

export default Home;

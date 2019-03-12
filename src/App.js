import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./components/home";
import { Room } from "./components/room";

export class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/room" component={Room} />
        </div>
      </Router>
    );
  }
}

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Room from "./components/room";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/room" component={Room} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

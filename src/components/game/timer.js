import React, { Component } from "react";
import SocketServer from "../socketServer";

class Timer extends Component {
  socketServer = new SocketServer();
  timer = null;
  state = {
    second: ""
  };
  componentDidMount = () => {
    !this.props.reset || this.props.reset(this.resetTimer);
    this.socketServer.updateTimer(this.props.second);
    this.syncTimer();
  };
  syncTimer = () => {
    this.socketServer.setupClient.on("update timer", timer => {
      timer > 0 || this.timeout();
      this.setState({ second: this.formatSecToMin(timer) });
    });
  };
  formatSecToMin = (second) => {
    var date = new Date(null);
    date.setSeconds(second);
    return date.toISOString().substr(14, 5);
  };
  resetTimer = () => {
    this.socketServer.updateTimer(this.props.second);
  };
  timeout = () => {
    if (!!this.props.timeout) {
      this.props.timeout();
    }
  };
  componentWillUnmount = () => {
    this.socketServer.setupClient.close();
  };
  render() {
    return <div>{this.state.second}</div>;
  }
}

export default Timer;

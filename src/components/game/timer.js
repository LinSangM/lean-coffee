import React, { Component } from "react";
import SocketServer from "../socketServer";

class Timer extends Component {
  socketServer = new SocketServer();
  timer = null;
  state = {
    second: this.props.second
  };
  componentDidMount = () => {
    !this.props.reset || this.props.reset(this.resetTimer);
    this.socketServer.updateTimer(this.props.second);
    this.syncTimer();
  };
  syncTimer = () => {
    this.socketServer.setupClient.on("update timer", timer => {
      timer > 0 || this.timeout();
      this.setState({ second: timer })
    });
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
  }
  render() {
    return <div>{this.state.second}</div>;
  }
}

export default Timer;

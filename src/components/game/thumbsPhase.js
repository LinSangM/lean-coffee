import React, { Component } from "react";
import Timer from "./timer";
import SocketServer from "../socketServer";

class ThumbsPhase extends Component {
  socketServer = new SocketServer();
  second = 15;
  thumbs = 0;
  isContinue = false;
  thumbsUp = () => {
    if (this.thumbs === 0) {
      this.socketServer.updateThumbs(1);
      this.thumbs = 1;
    }
    if (this.thumbs < 0) {
      this.socketServer.updateThumbs(2);
      this.thumbs = 1;
    }
  };
  thumbsDown = () => {
    if (this.thumbs === 0) {
      this.socketServer.updateThumbs(-1);
      this.thumbs = -1;
    }
    if (this.thumbs > 0) {
      this.socketServer.updateThumbs(-2);
      this.thumbs = -1;
    }
  };
  componentDidMount = () => {
    this.socketServer.setupClient.on("update thumbs", state => {
      this.isContinue = state;
    });
  };
  shouldContinue = () => {
    this.socketServer.updateThumbsPhaseState(false);
    this.isContinue
      ? this.props.moveToNextTopic()
      : this.props.stayAtSameTopic();
  };
  render() {
    return (
      <div>
        <Timer second={this.second} timeout={this.shouldContinue} />
        <button
          onClick={() => {
            this.thumbsUp();
          }}
        >
          Thumbs Up
        </button>
        <button
          onClick={() => {
            this.thumbsDown();
          }}
        >
          Thumbs Down
        </button>
      </div>
    );
  }
}

export default ThumbsPhase;

import React, { Component } from "react";
import { ContinueButton } from "./continueButton";
import { Timer } from "./timer";
import { ThumbsPhase } from "./thumbsPhase";
import { SocketServer } from "../socketServer";

export class GamePhase extends Component {
  socketServer = new SocketServer();
  second = 180;
  state = {
    currentTopicIndex: 0,
    isThumbsTime: false
  };
  currentTopic = () => {
    const index = this.state.currentTopicIndex;
    return index
      ? this.props.topics[index]
      : this.props.topics[this.state.currentTopicIndex];
  };
  nextTopic = () => {
    const index = this.state.currentTopicIndex;
    return index + 1 >= this.props.topics.length
      ? this.currentTopic(index) && this.props.finishGame()
      : (() => {
        this.socketServer.updateCurrentTopicIndex(index + 1);
        this.state.isThumbsTime || this.resetTopicTimer();
      })();
  };
  previousTopic = () => {
    const index = this.state.currentTopicIndex;
    return index - 1 >= 0
      ? (() => {
        this.socketServer.updateCurrentTopicIndex(index - 1);
        this.state.isThumbsTime || this.resetTopicTimer();
      })()
      : this.currentTopic(index);
  };
  componentDidMount = () => {
    this.syncUpdateCurrentTopic();
    this.socketServer.updateCurrentTopicIndex();
    this.syncThumbsState();
    this.socketServer.updateThumbsPhaseState();
  };
  componentWillUnmount = () => {
    this.socketServer.setupClient.close();
  }
  syncUpdateCurrentTopic = () => {
    this.socketServer.setupClient.on("update current topic index", index => {
      this.currentTopic(index);
      this.setState({ currentTopicIndex: index });
    });
  };
  syncThumbsState = () => {
    this.socketServer.setupClient.on("update thumbs phase state", state => {
      this.setState({ isThumbsTime: state });
    });
  };
  render() {
    let action = this.state.isThumbsTime ? (
      <ThumbsPhase
        moveToNextTopic={() => {
          this.nextTopic();
        }}
        stayAtSameTopic={() => {
          this.resetTopicTimer();
        }}
      />
    ) : (
        <Timer
          second={this.second}
          timeout={() => {
            this.socketServer.updateThumbsPhaseState(true);
          }}
          reset={reset => (this.resetTopicTimer = reset)}
        />
      );
    return (
      <div>
        <div>
          <ContinueButton
            previousTopic={this.previousTopic}
            nextTopic={this.nextTopic}
          />
          <button onClick={this.props.finishGame}>Finish Game</button>
        </div>
        <div>
          <h2>{this.currentTopic().content}</h2>
        </div>
        {action}
      </div>
    );
  }
}

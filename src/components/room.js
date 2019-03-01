import React, { Component } from "react";
import GamePhase from "./game/gamePhase";
import TopicPhase from "./topic/topicPhase";
import SocketServer from "./socketServer";

class Room extends Component {
  socketServer = new SocketServer();
  state = {
    gameIsOn: false,
    topics: []
  };
  updateTopics = topics => {
    this.socketServer.updateTopics(topics);
  };
  startGame = () => {
    this.socketServer.updateGamingPhaseState(true)
  };
  finishGame = () => {
    this.socketServer.updateGamingPhaseState(false);
    this.socketServer.resetAllState();
  };
  componentDidMount = () => {
    this.syncUpdateTopics();
    this.socketServer.updateTopics();
    this.syncGamePhaseState();
    this.socketServer.updateGamingPhaseState();
  };
  componentWillUnmount = () => {
    this.socketServer.setupClient.close();
  }
  syncGamePhaseState = () => {
    this.socketServer.setupClient.on("update game phase state", state => {
      this.setState({gameIsOn:state});
    });
  }
  syncUpdateTopics = () => {
    this.socketServer.setupClient.on("update topics", topics => {
      this.setState(topics);
    });
  };
  render() {
    let phase = this.state.gameIsOn ? (
      <GamePhase topics={this.state.topics} finishGame={this.finishGame} />
    ) : (
      <TopicPhase
        topics={this.state.topics}
        updateTopics={this.updateTopics}
        startGame={this.startGame}
      />
    );
    return (
      <div>
        <h1>Coffee Time</h1>
        {phase}
      </div>
    );
  }
}

export default Room;

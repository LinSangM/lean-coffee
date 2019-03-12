import socketIOClient from "socket.io-client";

export class SocketServer {
  endpoint = "http://localhost:4000";
  constructor() {
    this.setupClient = socketIOClient(this.endpoint);
    this.resetAllState = () => {
      this.setupClient.emit("finish game");
    };
    this.updateTopics = topics => {
      this.setupClient.emit("update topics", topics);
    };
    this.updateCurrentTopicIndex = index => {
      this.setupClient.emit("update current topic index", index);
    };
    this.updateTimer = timer => {
      this.setupClient.emit("update timer", timer);
    };
    this.updateGamingPhaseState = state => {
      this.setupClient.emit("update game phase state", state);
    };
    this.updateThumbsPhaseState = state => {
      this.setupClient.emit("update thumbs phase state", state);
    };
    this.updateThumbs = thumbs => {
      this.setupClient.emit("update thumbs", thumbs);
    };
  }
}

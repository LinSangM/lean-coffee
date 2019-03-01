const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let state = {
  topics: [],
  gameing: false,
  gameingPhase: { currentIndex: 0, isThumbsTime: false },
  thumbs: 0,
  timer: 0
};

io.on("connection", socket => {
  let timer = null;
  const startTimer = () => {
    timer = setInterval(() => {
      state.timer - 1 > -1
        ? (() => {
            state.timer = state.timer - 1;
            socket.emit("update timer", state.timer);
          })()
        : (() => {
            stopTimer();
            socket.emit("update timer", -1);
          })();
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timer);
  };

  socket.on("update topics", topics => {
    if (topics !== null) {
      state.topics = topics;
    }
    io.sockets.emit("update topics", state.topics);
  });

  socket.on("update game phase state", game => {
    if (game !== null) {
      state.gameing = game;
    }
    io.sockets.emit("update game phase state", state.gameing);
  });

  socket.on("update timer", timer => {
    stopTimer();
    if (timer !== null) {
      state.timer = timer;
      startTimer();
    }
  });

  socket.on("update current topic index", index => {
    if (index !== null) {
      state.gameingPhase.currentIndex = index;
    }
    io.sockets.emit(
      "update current topic index",
      state.gameingPhase.currentIndex
    );
  });

  socket.on("update thumbs phase state", thumbs => {
    if (thumbs !== null) {
      state.gameingPhase.isThumbsTime = thumbs;
    }
    if (thumbs === false) {
      state.thumbs = 0;
    }
    io.sockets.emit(
      "update thumbs phase state",
      state.gameingPhase.isThumbsTime
    );
  });

  socket.on("update thumbs", thumbs => {
    if (thumbs !== null) {
      state.thumbs = state.thumbs + thumbs;
    }
    io.sockets.emit("update thumbs", state.thumbs <= 0);
  });

  socket.on("finish game", () => {
    !timer || stopTimer();
    state = {
      topics: [],
      gameing: false,
      gameingPhase: { currentIndex: 0, isThumbsTime: false },
      thumbs: 0,
      timer: 0
    };
  });

  socket.on("disconnect", () => {
    stopTimer()
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

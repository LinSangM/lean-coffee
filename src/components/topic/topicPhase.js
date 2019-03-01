import React from "react";
import AddTopic from "./addTopic";
import ViewTopic from "./viewTopic";
import StartButton from "../game/startButton";

const TopicPhase = ({ topics, updateTopics, startGame }) => {
  const addTopic = topic => {
    topic.id =
      [...topics].reduce(
        function(pre, cur) {
          if (+cur.id > +pre.id) {
            return cur;
          } else {
            return pre;
          }
        },
        { id: 0 }
      ).id + 1;
    let update = [...topics, topic];
    updateTopics({
      topics: update
    });
  };
  const deleteTopic = topicId => {
    const update = topics.filter(topic => {
      return topic.id !== topicId;
    });
    updateTopics({
      topics: update
    });
  };
  const start = topics.length > 0 ? <StartButton startGame={startGame} /> : null;
  return (
    <div>
      <AddTopic addTopic={addTopic} />
      <ViewTopic topics={topics} deleteTopic={deleteTopic} />
      {start}
    </div>
  );
};

export default TopicPhase;

import React from "react";

export const ViewTopic = ({ topics, deleteTopic }) => {
  const topicList = topics.length ? (
    topics.map(topic => {
      return (
        <div key={topic.id}>
          <button
            onClick={() => {
              deleteTopic(topic.id);
            }}
          >
            Delete Topic
          </button>
          <span>{topic.content}</span>
        </div>
      );
    })
  ) : (
    <div>
      <p>You have no topic added yet.</p>
    </div>
  );
  return <div>{topicList}</div>;
};

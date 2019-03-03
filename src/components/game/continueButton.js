import React from "react";

export const ContinueButton = ({previousTopic, nextTopic}) => {
  return (
    <div>
      <button onClick={()=>{previousTopic()}}>Previous Topic</button>
      <button onClick={()=>{nextTopic()}}>Next Topic</button>
    </div>
  );
};

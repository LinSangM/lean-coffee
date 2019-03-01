import React from "react";

const ContinueButton = ({previousTopic, nextTopic}) => {
  return (
    <div>
      <button onClick={()=>{previousTopic()}}>Previous Topic</button>
      <button onClick={()=>{nextTopic()}}>Next Topic</button>
    </div>
  );
};

export default ContinueButton;

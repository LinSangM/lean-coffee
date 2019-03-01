import React from "react";

const StartButton = ({startGame}) => {
  return (
    <div>
      <button onClick={()=>{startGame()}}>Start</button>
    </div>
  );
};

export default StartButton;

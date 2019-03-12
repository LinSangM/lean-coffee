import React from "react";

export const StartButton = ({startGame}) => {
  return (
    <div>
      <button onClick={()=>{startGame()}}>Start</button>
    </div>
  );
};

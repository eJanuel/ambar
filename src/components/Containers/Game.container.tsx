import React from "react";

import MainScene from "../Game/Three/Scenes/Main.scene";

import "../../styles/Game.css";

const GameContainer: React.FC = () => {
  return (
    <div id="game-container">
      <MainScene />
    </div>
  );
};

export default GameContainer;

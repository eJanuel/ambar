import React from "react";

import DraggableWrapper from "../Game/UI/DraggableWrapper";
import { TimeBarUI } from "../Game/UI/TimeBar.component";
import { PawnBarUI } from "../Game/UI/PawnBar.component";

import "../../styles/UI.css";
import { MenuButtonUI } from "../Game/UI/MenuButton";

const UIContainer: React.FC = () => {
  const timeBarOptions = ["Option 1", "Option 2", "Option 3"];
  const pawnBarOptions = ["Option 4", "Option 5", "Option 6"];

  return (
    <div id="UI-container">
      <DraggableWrapper UIidentifier={1} options={timeBarOptions}>
        <TimeBarUI />
      </DraggableWrapper>
      <DraggableWrapper UIidentifier={2} options={pawnBarOptions}>
        <PawnBarUI />
      </DraggableWrapper>
      
        <MenuButtonUI />
    </div>
  );
};

export default UIContainer;

import React from "react";
import { MainMenu } from "../components/Menu/MainMenu.component";

const MenuContainer: React.FC = () => {
  return (
    <div id="MenuContainer" className="menu-container">
      <MainMenu />
    </div>
  );
};

export default MenuContainer;

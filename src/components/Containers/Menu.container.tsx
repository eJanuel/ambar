import React from "react";
import { MainMenu } from "../Menu/MainMenu.component";
import "../../styles/Menu.css";

const MenuContainer: React.FC = () => {
  return (
    <div id="MenuContainer" className="menu-container">
      <MainMenu />
    </div>
  );
};

export default MenuContainer;

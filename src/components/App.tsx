import React from "react";
import { useSelector } from "react-redux";
import GameContainer from "./Containers/Game.container";
import UIContainer from "./Containers/UIContainer";
import MenuContainer from "./Containers/Menu.container";
import { RootState } from "../redux/types/Store.types";

// TODO: Refactor the game logic to use Classes instead of interfaces
// TODO: Rewrite CSS with grid

const App: React.FC = () => {
  const mapState = useSelector((state: RootState) => state.menu.newGameForm.mapForm.currentMap);

  return (
    <>
      {false ? (
        <>
          <UIContainer />
          <GameContainer />
        </>
      ) : (
        <MenuContainer />
      )}
    </>
  );
};

export default App;

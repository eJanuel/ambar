import React from "react";
import { useSelector } from "react-redux";
import GameContainer from "./containers/Game.container";
import UIContainer from "./containers/UIContainer";
import MenuContainer from "./containers/Menu.container";
import { RootState } from "./utils/types/Store.types";

// TODO: Rearrange the files to have on one side the web components and the game ones on another
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

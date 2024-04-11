import React from "react";
import { useSelector } from "react-redux";
import GameContainer from "./components/Containers/Game.container";
import UIContainer from "./components/Containers/UIContainer";
import MenuContainer from "./components/Containers/Menu.container";
import { RootState } from "./redux/types/Store.types";

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

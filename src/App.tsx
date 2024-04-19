import React from "react";
import { useSelector } from "react-redux";
import GameContainer from "./components/Containers/Game.container";
import UIContainer from "./components/Containers/UIContainer";
import MenuContainer from "./components/Containers/Menu.container";
import { RootState } from "./redux/types/Store.types";

const App: React.FC = () => {
  const isGameRunning = useSelector((state: RootState) => state.game.isGameRunning);

  return (
    <>
      {isGameRunning ? (
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

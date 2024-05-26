import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "./redux/types/Store.types";

import GameContainer from "./components/Containers/Game.container";
import UIContainer from "./components/Containers/UIContainer";
import MenuContainer from "./components/Containers/Menu.container";

const App: React.FC = () => {
  const { isGameRunning }: { isGameRunning: boolean } = useSelector(
    (state: RootState) => state.game
  );

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

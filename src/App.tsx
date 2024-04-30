import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameContainer from "./components/Containers/Game.container";
import UIContainer from "./components/Containers/UIContainer";
import MenuContainer from "./components/Containers/Menu.container";
import { AppDispatch, RootState } from "./redux/types/Store.types";
import { GameSaveFolder } from "./game/types/Game.types";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isGameRunning = useSelector(
    (state: RootState) => state.game.isGameRunning
  );

  // AUTOLOAD
  // const localSavedGames = localStorage.getItem("savedGames");
  // const savedGames: GameSaveFolder[] = localSavedGames
  //   ? JSON.parse(localSavedGames)
  //   : [];

  // useEffect(() => {
  //   if (savedGames.length > 0) {
  //     dispatch({
  //       type: "game/loadGame",
  //       payload: {
  //         id: savedGames[0].id,
  //         name: savedGames[0].name,
  //         save: savedGames[0].saves[0],
  //       },
  //     });
  //   }
  // }, [savedGames]);

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

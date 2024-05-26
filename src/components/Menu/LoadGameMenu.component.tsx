import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/types/Store.types";
import {
  MenuDisplayablePages,
  setDisplayedPage,
  setRefreshDB,
} from "../../redux/reducers/app/Menu.reducer";
import { deleteSave, loadSave } from "../../redux/actions/Game.actions";

import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";

import { GameSave } from "../../types/Game.types";
import { IndexedDBHelper } from "../../helpers/IndexDB.helper";


const LoadGameMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [savedGames, setSavedGames] = useState<{
    [key: string]: { key: string; data: GameSave }[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { refreshDB }: { refreshDB: boolean } = useSelector(
    (state: RootState) => state.menu
  );
  const { indexDB }: { indexDB: IndexedDBHelper } = useSelector(
    (state: RootState) => state.db
  );

  useEffect(() => {
    if (refreshDB) {
      indexDB.getAll("games").then((games) => {
        if (games) {
          const groupedGames = games.reduce((acc, game) => {
            const gameID = game.data.gameID;
            if (!acc[gameID]) {
              acc[gameID] = [];
            }
            acc[gameID].push(game);
            return acc;
          }, {} as { [key: string]: { key: string; data: GameSave }[] });
          setSavedGames(groupedGames);
          setIsLoading(false);
        }
      });
      dispatch(setRefreshDB(false));
    }
  }, [refreshDB]);

  const handleLoad = (saveID: string) => {
    dispatch(loadSave(saveID));
  };

  const handleDelete = (saveID: string) => {
    dispatch(deleteSave(saveID));
  };

  return (
    <>
      <div
        onClick={() => {
          dispatch(setDisplayedPage(MenuDisplayablePages.MENU));
          dispatch(setRefreshDB(true));
        }}
        className="load-game-menu__return-button"
      >
        <ReturnArrowIcon />
      </div>
      <div className="load-game-menu">
        <h1 className="load-game-menu__title">Load Game</h1>

        {isLoading ? (
          <p className="load-game-menu__loading">Loading...</p>
        ) : Object.keys(savedGames).length === 0 ? (
          <p className="load-game-menu__no-saves">
            No saved games found. Start a new game to save your progress.
          </p>
        ) : (
          <div className="load-game-menu__games">
            {Object.entries(savedGames).map(([gameID, saves]) => {
              const gameName = saves[0].data.gameName;
              return (
                <div key={gameID} className="game">
                  <h2 className="game__title">{gameName}</h2>
                  <div className="game__save-container">
                    {saves.map((save) => (
                      <div key={save.key} className="game__save">
                        <div className="game__save-info">
                          <TimeSpentDisplay
                            gameClock={{
                              minutes: save.data.clock.gameMinutes,
                              hours: save.data.clock.gameHours,
                              days: save.data.clock.gameDays,
                              months: save.data.clock.gameMonths,
                              years: save.data.clock.gameYears,
                            }}
                          />
                          <p className="game__pawns-count">
                            Total Pawns: {save.data.pawns.length}
                          </p>
                        </div>
                        <button
                          onClick={() => handleLoad(save.key)}
                          className="game__load-button"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(save.key);
                          }}
                          className="game__delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

interface ClockProps {
  gameClock: {
    minutes: number;
    hours: number;
    days: number;
    months: number;
    years: number;
  };
}

const TimeSpentDisplay: React.FC<ClockProps> = ({ gameClock }) => {
  const isFreshStart =
    gameClock.minutes === 0 &&
    gameClock.hours === 0 &&
    gameClock.days === 0 &&
    gameClock.months === 0 &&
    gameClock.years === 0;

  return (
    <>
      <span className="game__time-spent">Time Spent: </span>
      {isFreshStart ? (
        <span>Freshly Started</span>
      ) : (
        <span>
          {gameClock.years > 0 && `${gameClock.years}Y `}
          {gameClock.months > 0 && `${gameClock.months}M `}
          {gameClock.days > 0 && `${gameClock.days}d `}
          {gameClock.hours > 0 && `${gameClock.hours}h `}
          {gameClock.minutes > 0 && `${gameClock.minutes}m`}
        </span>
      )}
    </>
  );
};

export default LoadGameMenu;

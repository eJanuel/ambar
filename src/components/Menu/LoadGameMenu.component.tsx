import { useDispatch, useSelector } from "react-redux";
import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";
import { AppDispatch, RootState } from "../../redux/types/Store.types";
import { GameSaveFolder } from "../../game/types/Game.types";

interface LoadGameProps {
  returnToMenu: () => void;
}

const LoadGameMenu: React.FC<LoadGameProps> = ({ returnToMenu }) => {
  const dispatch = useDispatch<AppDispatch>();
  const step: number = useSelector((state: RootState) => state.menu.step);

  const localSavedGames = localStorage.getItem("savedGames");
  const savedGames: GameSaveFolder[] = localSavedGames
    ? JSON.parse(localSavedGames)
    : [];

  const setStep = (newStep: number) => {
    if (newStep === 0) {
      returnToMenu();
    } else {
      dispatch({ type: "menu/setStep", payload: newStep });
    }
  };
  return (
    <>
      <div
        onClick={() => setStep(step - 1)}
        className="new-game-form__return-button"
      >
        <ReturnArrowIcon />
      </div>
      <div>
        <h1>Load Game</h1>
        <div>
          {savedGames.map((game) => (
            <div key={game.id}>
              <h2>{game.name}</h2>
              {game.saves.map((save, index) => (
                <div key={index}>
                  <div>
                    <TimeSpentDisplay
                      gameClock={{
                        minutes: save.clock.gameMinutes,
                        hours: save.clock.gameHours,
                        days: save.clock.gameDays,
                        months: save.clock.gameMonths,
                        years: save.clock.gameYears,
                      }}
                    />
                    <p>Total Pawns: {save.pawns.length}</p>
                    <p>Narrator: {save.settings.narrator}</p>
                    <p>Difficulty: {save.settings.difficulty}</p>
                  </div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "game/loadGame",
                        payload: { id: game.id, name: game.name, save },
                      })
                    }
                  >
                    Load
                  </button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "game/deleteSave",
                        payload: { id: game.id, index },
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
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
      <span>Time Spent :</span>
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

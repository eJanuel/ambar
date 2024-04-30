import { useDispatch } from "react-redux";
import { ReturnArrowIcon } from "../Icons/ReturnArrow.icon";
import { AppDispatch } from "../../redux/types/Store.types";
import { GameSaveFolder } from "../../game/types/Game.types";
import {
  MenuDisplayablePages,
  setDisplayedPage,
} from "../../redux/reducers/app/Menu.reducer";
import { deleteSave, loadSave } from "../../redux/actions/Game.actions";

const LoadGameMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const localSavedGames = localStorage.getItem("savedGames");
  const savedGames: GameSaveFolder[] = localSavedGames
    ? JSON.parse(localSavedGames)
    : [];

  return (
    <>
      <div
        onClick={() => dispatch(setDisplayedPage(MenuDisplayablePages.MENU))}
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
                      dispatch(loadSave({ id: game.id, name: game.name, save }))
                    }
                  >
                    Load
                  </button>
                  <button
                    onClick={() => {
                      console.log(game.id, index);
                      dispatch(deleteSave({ id: game.id, index }));
                    }}
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

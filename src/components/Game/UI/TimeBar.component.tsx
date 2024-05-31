import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import {
  setSpeed,
  togglePause,
} from "../../../redux/reducers/game/Clock.reducer";
import { PlayIcon } from "../../Icons/UI/Play.icon";
import { PauseIcon } from "../../Icons/UI/Pause.icon";

export const TimeBarUI: React.FC<{ display: "row" | "column" }> = ({
  display,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    speed,
    isPaused,
    gameDays,
    gameHours,
    gameMinutes,
  }: {
    speed: number;
    isPaused: boolean;
    gameDays: number;
    gameHours: number;
    gameMinutes: number;
  } = useSelector((state: RootState) => state.clock);

  const handleClick = (speed: 1 | 2 | 3 | 30 | 300) => {
    if (isPaused) {
      dispatch(togglePause());
    }
    dispatch(setSpeed(speed));
  };

  return (
    <div id="ui-timeBar" className={`ui--item__container item__${display}`}>
      <div className="timeBar--buttons">
        <button className="timeBar--button-play">
          {isPaused ? (
            <PlayIcon onClick={() => dispatch(togglePause())} />
          ) : (
            <PauseIcon onClick={() => dispatch(togglePause())} />
          )}
        </button>
        <button
          className={`timeBar--button-speed ${speed === 1 && "button--selected"}`}
          onClick={() => handleClick(1)}
          disabled={speed === 1}
        >
          x1
        </button>
        <button
          className={`timeBar--button-speed ${speed === 2 && "button--selected"}`}
          onClick={() => handleClick(2)}
          disabled={speed === 2}
        >
          x2
        </button>
        <button
          className={`timeBar--button-speed ${speed === 3 && "button--selected"}`}
          onClick={() => handleClick(3)}
          disabled={speed === 3}
        >
          x3
        </button>
        <button
          className={`timeBar--button-speed ${speed === 300 && "button--selected"}`}
          onClick={() => handleClick(300)}
          disabled={speed === 300}
        >
          x300
        </button>
      </div>
      <div className="timeBar--timeDisplay">
        <span>
          <em>{gameDays}d</em> <em>{gameHours}h</em> <em>{gameMinutes}m</em>
        </span>
      </div>
    </div>
  );
};

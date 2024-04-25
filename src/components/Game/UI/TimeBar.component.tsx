import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/types/Store.types";
import { setSpeed, togglePause } from "../../../redux/reducers/game/Clock.reducer";

export const TimeBarUI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { speed, isPaused, gameDays, gameHours, gameMinutes } = useSelector(
    (state: RootState) => state.clock
  );

  const handleClick = (speed: 1 | 2 | 3 | 30 | 300) => {
    if (isPaused) {
      dispatch(togglePause());
    }
    dispatch(setSpeed(speed));
  };

  return (
    <>
      <div className="UI--speedControls">
        <button
          className={`UI--speedControls__button ${
            isPaused
              ? "UI--speedControls__button-resume"
              : "UI--speedControls__button-pause"
          }`}
          onClick={() => dispatch(togglePause())}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          className={`UI--speedControls__button ${
            speed === 1 ? "UI--speedControls__button-disabled" : ""
          }`}
          onClick={() => handleClick(1)}
          disabled={speed === 1}
        >
          x1
        </button>
        <button
          className={`UI--speedControls__button ${
            speed === 2 ? "UI--speedControls__button-disabled" : ""
          }`}
          onClick={() => handleClick(2)}
          disabled={speed === 2}
        >
          x2
        </button>
        <button
          className={`UI--speedControls__button ${
            speed === 3 ? "UI--speedControls__button-disabled" : ""
          }`}
          onClick={() => handleClick(3)}
          disabled={speed === 3}
        >
          x3
        </button>
        <button
          className={`UI--speedControls__button ${
            speed === 30 ? "UI--speedControls__button-disabled" : ""
          }`}
          onClick={() => handleClick(30)}
          disabled={speed === 30}
        >
          x30
        </button>
        <button
          className={`UI--speedControls__button ${
            speed === 300 ? "UI--speedControls__button-disabled" : ""
          }`}
          onClick={() => handleClick(300)}
          disabled={speed === 300}
        >
          x300
        </button>
      </div>
      <div className="UI--timeDisplay">
        {gameDays}d {gameHours}h {gameMinutes}m
      </div>
    </>
  );
};

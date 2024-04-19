import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/types/Store.types";
import { setSpeed, togglePause } from "../../redux/reducers/game/Clock.reducer";

export const TimeBarUI: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { speed, isPaused, gameDays, gameHours, gameMinutes } = useSelector(
    (state: RootState) => state.clock
  );

  useEffect(() => {
    console.log("minutes:", gameMinutes, "hours:", gameHours, "days", gameDays);
  }, [gameMinutes, gameHours, gameDays])

  const handleClick = (speed: 1 | 2 | 3 | 30) => {
    if (isPaused) {
      dispatch(togglePause());
    }
    dispatch(setSpeed(speed));
  };

  return (
    <div>
      <div>
        <button onClick={() => dispatch(togglePause())}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onClick={() => handleClick(1)} disabled={speed === 1}>
          x1
        </button>
        <button onClick={() => handleClick(2)} disabled={speed === 2}>
          x2
        </button>
        <button onClick={() => handleClick(3)} disabled={speed === 3}>
          x3
        </button>
        <button onClick={() => handleClick(30)} disabled={speed === 30}>
          x30
        </button>
      </div>
      <div>
        {gameDays}d {gameHours}h {gameMinutes}m
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../utils/types/Store.types";
import { toggleDevMode } from '../reducers/UI.reducer';
import DevUI from "../components/UI/Dev/Dev-UI.component";

const UIContainer: React.FC = () => {
  const dispatch = useDispatch();
  const devMode = useSelector((state: RootState) => state.ui.devMode);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "d" && event.getModifierState("Control")) {
        if (devMode) {
          dispatch(toggleDevMode());
        } else {
          const input = prompt("dev password:");
          if (input && input.toLowerCase() === "dev123") {
            dispatch(toggleDevMode());
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [devMode, dispatch]);

  useEffect(() => {
    console.log("devMode:", devMode ? "enabled" : "disabled");
  }, [devMode]);

  return <div>
    {devMode && ( <DevUI /> )}
  </div>;
};

export default UIContainer;
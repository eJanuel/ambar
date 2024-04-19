import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/types/Store.types";
import { toggleDevMode } from '../../redux/reducers/app/UI.reducer';

import DevUI from "../UI/Dev/Dev-UI.component";
import { TimeBarUI } from "../UI/TimeBar.component";

import "../../styles/UI.css";

const UIContainer: React.FC = () => {
  const dispatch = useDispatch();
  const devMode = useSelector((state: RootState) => state.ui.devMode);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // event.preventDefault();
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

  return <div id="UI-container">
    {devMode && ( <DevUI /> )}
    <TimeBarUI />
  </div>;
};

export default UIContainer;
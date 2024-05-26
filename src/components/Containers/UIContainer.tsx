import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/types/Store.types";
import {
  setAltModifierPressed,
  setCtrlModifierPressed,
  setDraggablePositions,
  setShiftModifierPressed,
} from "../../redux/reducers/game/UI.reducer";

import DraggableWrapper from "../Game/UI/DraggableWrapper";
import { TimeBarUI } from "../Game/UI/TimeBar.component";
import { PawnBarUI } from "../Game/UI/PawnBar.component";
import { LayerBarUI } from "../Game/UI/LayerBar";
import { MenuButtonUI } from "../Game/UI/MenuButton";

import { IndexedDBHelper } from "../../helpers/IndexDB.helper";

import "../../styles/UI.css";
import { upgradeDB } from "../../redux/reducers/app/DB.reducer";

const UIContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { indexDB, version }: { indexDB: IndexedDBHelper; version: number } =
    useSelector((state: RootState) => state.db);
  const {
    draggablePositions,
  }: { draggablePositions: { [id: number]: { x: number; y: number } } } =
    useSelector((state: RootState) => state.ui);

  const timeBarOptions = ["Option 1", "Option 2", "Option 3"];
  const pawnBarOptions = ["Option 4", "Option 5", "Option 6"];
  const LayerBarOptions = ["Option 4", "Option 5", "Option 6"];

  const defaultPosition: { x: number; y: number }[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  useEffect(() => {
    version === 1 && dispatch(upgradeDB());
    indexDB.getAll("settings").then((settings) => {
      let newDraggablePositions: { x: number; y: number }[] = [];
      if (settings) {
        for (let i = 0; i < 3; i++) {
          let foundSetting = settings.find(
            (setting) => Number(setting.key) === i
          );
          if (foundSetting) {
            newDraggablePositions.push(foundSetting.data);
          } else {
            newDraggablePositions.push(defaultPosition[i]);
          }
        }
      } else {
        newDraggablePositions = defaultPosition;
      }

      dispatch(setDraggablePositions(newDraggablePositions));
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        dispatch(setShiftModifierPressed(true));
      } else if (event.key === "Control") {
        dispatch(setCtrlModifierPressed(true));
      } else if (event.key === "Alt") {
        dispatch(setAltModifierPressed(true));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        dispatch(setShiftModifierPressed(false));
      } else if (event.key === "Control") {
        dispatch(setCtrlModifierPressed(false));
      } else if (event.key === "Alt") {
        dispatch(setAltModifierPressed(false));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

  return (
    <div id="UI-container">
      <DraggableWrapper
        UIidentifier={0}
        options={timeBarOptions}
        position={draggablePositions[0]}
      >
        <TimeBarUI />
      </DraggableWrapper>
      <DraggableWrapper
        UIidentifier={1}
        options={pawnBarOptions}
        position={draggablePositions[1]}
      >
        <PawnBarUI />
      </DraggableWrapper>
      <DraggableWrapper
        UIidentifier={2}
        options={LayerBarOptions}
        position={draggablePositions[2]}
      >
        <LayerBarUI />
      </DraggableWrapper>

      <MenuButtonUI />
    </div>
  );
};

export default UIContainer;

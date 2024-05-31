import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/types/Store.types";
import {
  setAltModifierPressed,
  setCtrlModifierPressed,
  setDraggableDirections,
  setDraggablePositions,
  setShiftModifierPressed,
  toggleDraggableDirection,
  updateDraggablePosition,
} from "../../redux/reducers/game/UI.reducer";

import DraggableWrapper from "../Game/UI/DraggableWrapper";
import { TimeBarUI } from "../Game/UI/TimeBar.component";
import { PawnBarUI } from "../Game/UI/PawnBar.component";
import { LayerBarUI } from "../Game/UI/LayerBar";
import { MenuButtonUI } from "../Game/UI/MenuButton";

import { IndexedDBHelper } from "../../helpers/IndexDB.helper";

import "../../styles/UI.css";
import { upgradeDB } from "../../redux/reducers/app/DB.reducer";

const DirectionSwitchOption: React.FC<{
  uiIdentifier: number;
}> = ({ uiIdentifier }) => {
  const dispatch = useDispatch<AppDispatch>();
  const direction: "column" | "row" = useSelector(
    (state: RootState) => state.ui.draggableDirections[uiIdentifier]
  );

  return (
    <div
      className="direction-switch"
      onClick={() => {
        dispatch(toggleDraggableDirection({ id: uiIdentifier }))
      }}
    >
      {direction === "column" ? "Switch to Row" : "Switch to Column"}
    </div>
  );
};

const UIContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { indexDB, version }: { indexDB: IndexedDBHelper; version: number } =
    useSelector((state: RootState) => state.db);
  const {
    draggablePositions,
    draggableDirections,
  }: {
    draggablePositions: { [id: number]: { x: number; y: number } };
    draggableDirections: { [id: number]: "column" | "row" };
  } = useSelector((state: RootState) => state.ui);

  const draggableOptions = [
    [DirectionSwitchOption({ uiIdentifier: 0 })],
    [DirectionSwitchOption({ uiIdentifier: 1 })],
    [DirectionSwitchOption({ uiIdentifier: 2 })],
  ];

  useEffect(() => {
    const borders = {
      left: -(window.innerWidth / 2),
      top: window.innerHeight / 2,
      right: window.innerWidth / 2,
      bottom: -(window.innerHeight / 2),
    };

    const draggableSize: { width: number; height: number }[] = Array.from(
      document.querySelectorAll("#ui-container .item__draggable")
    ).map((item) => {
      return {
        width: item.clientWidth,
        height: item.clientHeight,
      };
    });

    const defaultPosition: { x: number; y: number }[] = [
      {
        x: borders.right - draggableSize[0].width / 2,
        y: -borders.top + draggableSize[0].height / 2 + 120,
      },
      {
        x: borders.left + draggableSize[1].width / 2,
        y: -borders.top + draggableSize[1].height / 2 + 120,
      },
      {
        x: borders.right - draggableSize[2].width / 2,
        y: -borders.top + draggableSize[2].height / 2 + 260,
      },
    ];

    const defaultDirection: ("column" | "row")[] = ["row", "column", "column"];

    version === 1 && dispatch(upgradeDB());
    indexDB.getAll("settings").then((settings) => {
      let newDraggablePositions: { x: number; y: number }[] = [];
      let newDraggableDirections: ("column" | "row")[] = [];
      if (settings) {
        for (let i = 0; i < defaultPosition.length; i++) {
          //TODO: replace the comparison to a more accurate one
          let foundPosition = settings.find(
            (setting) => setting.key === "position#" + i.toString()
          );
          if (foundPosition) {
            newDraggablePositions.push(foundPosition.data);
          } else {
            newDraggablePositions.push(defaultPosition[i]);
          }

          let foundDirection = settings.find(
            (setting) => setting.key === "direction#" + i.toString()
          );
          if (foundDirection) {
            newDraggableDirections.push(foundDirection.data);
          } else {
            newDraggableDirections.push(defaultDirection[i]);
          }
        }
      } else {
        newDraggablePositions = defaultPosition;
      }

      dispatch(setDraggableDirections(newDraggableDirections));
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

  useEffect(() => {
    const originalWindowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const handleResize = () => {
      Object.keys(draggablePositions).forEach((key) => {
        let i = parseInt(key);
        let newPosition: { x: number; y: number } = {
          // Calculate the new position based on the original window size
          x:
            (draggablePositions[i].x / originalWindowSize.width) *
            window.innerWidth,
          y:
            (draggablePositions[i].y / originalWindowSize.height) *
            window.innerHeight,
        };
        console.log(newPosition);
        dispatch(updateDraggablePosition({ id: i, position: newPosition }));
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, draggablePositions]);

  return (
    <div id="ui-container">
      <DraggableWrapper
        direction={draggableDirections[0]}
        UIidentifier={0}
        options={draggableOptions[0]}
        position={draggablePositions[0]}
      >
        <TimeBarUI display="column" />
      </DraggableWrapper>
      <DraggableWrapper
        direction={draggableDirections[1]}
        UIidentifier={1}
        options={draggableOptions[1]}
        position={draggablePositions[1]}
      >
        <PawnBarUI display="column" />
      </DraggableWrapper>
      <DraggableWrapper
        direction={draggableDirections[2]}
        UIidentifier={2}
        options={draggableOptions[2]}
        position={draggablePositions[2]}
      >
        <LayerBarUI display="row" />
      </DraggableWrapper>

      <MenuButtonUI />
    </div>
  );
};

export default UIContainer;

import React, { ReactNode, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { updateDraggablePosition } from "../../../redux/reducers/game/UI.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types/Store.types";
import { DragLockIcon } from "../../Icons/UI/DragLock.icon";
import { SettingsIcon } from "../../Icons/UI/SettingsIcon";

interface DraggableWrapperProps {
  children: React.ReactNode;
  options: ReactNode[]; // replace with the options type
  UIidentifier: number;
  position?: { x: number; y: number };
  direction?: "column" | "row";
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  options,
  UIidentifier,
  position,
  direction,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDraggable, setIsDraggable] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  const toggleOptions = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    if (showOptions) {
      if (optionsRef.current) {
        const optionsWidth = optionsRef.current.offsetWidth;
        const optionsHeight = optionsRef.current.offsetHeight;

        let x = cursorPosition.x;
        let y = cursorPosition.y;

        // Adjust the x position if the options would appear off the right side of the window
        if (x + optionsWidth > window.innerWidth) {
          x = window.innerWidth - optionsWidth;
        }

        // Adjust the y position if the options would appear off the bottom of the window
        if (y + optionsHeight > window.innerHeight) {
          y = window.innerHeight - optionsHeight;
        }

        setOptionsPosition({ x, y });
      }
    }
  }, [showOptions]);

  const optionsRef = useRef<HTMLUListElement>(null);

  return (
    <>
      {showOptions && (
        <>
          <ul
            className="settings--options"
            ref={optionsRef}
            style={{
              position: "fixed",
              left: optionsPosition.x,
              top: optionsPosition.y,
            }}
          >
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
          <div
            className="settings--options__background"
            onClick={toggleOptions}
          ></div>
        </>
      )}
      <Draggable
        axis="both"
        bounds="parent"
        position={position}
        scale={1}
        disabled={isDraggable}
        onStop={(_e, data) => {
          if (!(data.x === position?.x && data.y === position?.y)) {
            dispatch(
              updateDraggablePosition({
                id: UIidentifier,
                position: { x: data.x, y: data.y },
              })
            );
          }
        }}
      >
        <div
          className={`ui--item item__draggable draggable__${
            !isDraggable ? "toggled" : "disabled"
          } item__${direction}`}
        >
          {children}
          <div className="item--settings__buttons">
            <DragLockIcon onClick={toggleDraggable} isLocked={isDraggable} />
            <SettingsIcon onClick={toggleOptions} />
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default DraggableWrapper;

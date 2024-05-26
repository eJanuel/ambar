import React, { useState } from "react";
import Draggable from "react-draggable";
import { updateDraggablePosition } from "../../../redux/reducers/game/UI.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types/Store.types";
import { DragLockIcon } from "../../Icons/UI/DragLock.icon";
import { SettingsIcon } from "../../Icons/UI/SettingsIcon";

interface DraggableWrapperProps {
  children: React.ReactNode;
  options: any[]; // replace with the options type
  UIidentifier: number;
  position?: { x: number; y: number };
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  children,
  options,
  UIidentifier,
  position,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDraggable, setIsDraggable] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
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
      <div className="UI--item UI--item__draggable">
        {children}
        <div className="UI--item--options">
          <DragLockIcon onClick={toggleDraggable} isLocked={isDraggable} />
          <SettingsIcon onClick={toggleOptions} />
        </div>
        {showOptions && (
          <ul>
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;

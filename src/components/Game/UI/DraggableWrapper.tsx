import React, { useState } from "react";
import Draggable from "react-draggable";
import { updatePosition } from "../../../redux/reducers/game/UI.reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/types/Store.types";

interface DraggableWrapperProps {
  children: React.ReactNode;
  options: any[]; // replace with the type of your options
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
      defaultPosition={position}
      scale={1}
      disabled={!isDraggable}
      onStop={(_e, data) => {
        dispatch(updatePosition({ id: UIidentifier, position: { x: data.x, y: data.y } }));
      }}
    >
      <div className="UI--item">
        {children}
        <button onClick={toggleDraggable}>
          {isDraggable ? "Disable Drag" : "Enable Drag"}
        </button>
        <button onClick={toggleOptions}>
          {showOptions ? "Hide Options" : "Show Options"}
        </button>
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

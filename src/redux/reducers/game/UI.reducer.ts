import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UIState {
  draggablePositions: { x: number; y: number }[];
  draggableDirections: ("column" | "row")[];
  layers: {
    displayed: number;
    opacity: number;
  };
  isShiftModifierPressed: boolean;
  isCtrlModifierPressed: boolean;
  isAltModifierPressed: boolean;
  hoveredObject: string | null;
  selectedObjects: string[];
}

const initialState: UIState = {
  draggablePositions: [],
  draggableDirections: [],
  layers: {
    displayed: 64,
    opacity: 0.5,
  },
  isShiftModifierPressed: false,
  isCtrlModifierPressed: false,
  isAltModifierPressed: false,
  hoveredObject: null,
  selectedObjects: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateDraggablePosition: (state, action: PayloadAction<{ id: number; position: { x: number; y: number } }>) => {
      state.draggablePositions[action.payload.id] = action.payload.position;
    },
    setDraggablePositions: (state, action: PayloadAction<{ x: number; y: number }[]>) => {
      state.draggablePositions = action.payload;
    },
    toggleDraggableDirection: (state, action: PayloadAction<{ id: number }>) => {
      state.draggableDirections[action.payload.id] = state.draggableDirections[action.payload.id] === "column" ? "row" : "column";
    },
    setDraggableDirections: (state, action: PayloadAction<("column" | "row")[]>) => {
      state.draggableDirections = action.payload;
    },
    setDisplayedLayer: (state, action: PayloadAction<number>) => {
      state.layers.displayed = action.payload;
    },
    setLayerOpacity: (state, action: PayloadAction<number>) => {
      state.layers.opacity = action.payload;
    },
    setShiftModifierPressed: (state, action: PayloadAction<boolean>) => {
      state.isShiftModifierPressed = action.payload;
    },
    setCtrlModifierPressed: (state, action: PayloadAction<boolean>) => {
      state.isCtrlModifierPressed = action.payload;
    },
    setAltModifierPressed: (state, action: PayloadAction<boolean>) => {
      state.isAltModifierPressed = action.payload;
    },
    setHoveredObject: (state, action: PayloadAction<string>) => {
      state.hoveredObject = action.payload;
    },
    addSelectedObject: (state, action: PayloadAction<string>) => {
      state.selectedObjects.push(action.payload);
    },
    removeSelectedObject: (state, action: PayloadAction<string>) => {
      state.selectedObjects = state.selectedObjects.filter((object) => object !== action.payload);
    },
    setSelectedObjects: (state, action: PayloadAction<string[]>) => {
      state.selectedObjects = action.payload;
    }
  },
});

export const {
  addSelectedObject,
  removeSelectedObject,
  setSelectedObjects,
  updateDraggablePosition,
  setDraggablePositions,
  toggleDraggableDirection,
  setDraggableDirections, setDisplayedLayer,
  setLayerOpacity, setShiftModifierPressed,
  setCtrlModifierPressed, setAltModifierPressed,
  setHoveredObject
} = uiSlice.actions;

export default uiSlice.reducer;
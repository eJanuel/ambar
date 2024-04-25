import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UIState {
  draggablePositions: { [id: number]: { x: number; y: number } };
}

const initialState: UIState = {
  draggablePositions: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updatePosition: (state, action: PayloadAction<{ id: number; position: { x: number; y: number } }>) => {
      state.draggablePositions[action.payload.id] = action.payload.position;
    },
  },
});

export const { updatePosition } = uiSlice.actions;
export default uiSlice.reducer;
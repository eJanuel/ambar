import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  devMode: boolean;
}

const initialState: UIState = {
  devMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDevMode: (state, action: PayloadAction<boolean>) => {
      state.devMode = action.payload;
    },
    toggleDevMode: (state) => {
      state.devMode = !state.devMode;
    },
  },
});

export const { setDevMode, toggleDevMode } = uiSlice.actions;
export default uiSlice.reducer;
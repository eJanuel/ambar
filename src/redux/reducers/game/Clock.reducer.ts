import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClockState {
  gameClock: number;
  speed: 1 | 2 | 3 | 30;
  isPaused: boolean;
  gameDays: number;
  gameHours: number;
  gameMinutes: number;
}

const initialState: ClockState = {
  gameClock: 0,
  speed: 1,
  isPaused: false,
  gameDays: 0,
  gameHours: 0,
  gameMinutes: 0,
};


const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    setClock: (state, action: PayloadAction<number>) => {
      state.gameClock = action.payload;
      state.gameHours = Math.floor(state.gameClock / 3600);
      state.gameMinutes = Math.floor((state.gameClock % 3600) / 60);
      if (state.gameClock >= 72000) {
        state.gameClock = 0;
        state.gameDays += 1;
      }
    },
    setSpeed: (state, action: PayloadAction<1 | 2 | 3 | 30>) => {
      state.speed = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
  },
});

export const { setClock, setSpeed, togglePause } = clockSlice.actions;

export default clockSlice.reducer;
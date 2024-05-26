import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClockPopulatePayload, populateClock } from '../../actions/Clock.actions';

export interface ClockState {
  speed: 1 | 2 | 3 | 30 | 300;
  isPaused: boolean;
  gameClock: number;
  gameMinutes: number;
  gameHours: number;
  gameDays: number;
  gameMonths: number;
  gameYears: number;
}

const initialState: ClockState = {
  speed: 1,
  isPaused: false,
  gameClock: 0,
  gameMinutes: 0,
  gameHours: 0,
  gameDays: 0,
  gameMonths: 0,
  gameYears: 0,
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
        if (state.gameDays === 30) {
          state.gameDays = 0;
          if (state.gameMonths === 12) {
            state.gameMonths = 0;
            state.gameYears += 1;
          }
          state.gameMonths += 1;
        }
        state.gameDays += 1;
      }
    },
    setSpeed: (state, action: PayloadAction<1 | 2 | 3 | 30 | 300>) => {
      state.speed = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(populateClock, (state, action: PayloadAction<ClockPopulatePayload>) => {
      state.gameClock = action.payload.gameClock;
      state.gameMinutes = action.payload.gameMinutes;
      state.gameHours = action.payload.gameHours;
      state.gameDays = action.payload.gameDays;
      state.gameMonths = action.payload.gameMonths;
      state.gameYears = action.payload.gameYears;
    });
  }
});

export const { setClock, setSpeed, togglePause } = clockSlice.actions;

export default clockSlice.reducer;
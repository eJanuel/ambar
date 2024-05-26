import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GamePopulatePayload, populateGame, startGame } from '../../actions/Game.actions';
export interface GameState {
  gameID: string | null;
  gameName: string;
  gameSettings: {
    difficulty: string;
    narrator: string;
  }
  isGameRunning: boolean;
}

const initialState: GameState = {
  gameID: null,
  gameName: '',
  gameSettings: {
    difficulty: '',
    narrator: ''
  },
  isGameRunning: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(populateGame, (state, action: PayloadAction<GamePopulatePayload>) => {
      state.gameID = action.payload.id;
      state.gameName = action.payload.name;
      state.gameSettings.difficulty = action.payload.settings.difficulty;
      state.gameSettings.narrator = action.payload.settings.narrator;
    });
    builder.addCase(startGame, (state) => {
      state.isGameRunning = true;
    });
  },
});

export default gameSlice.reducer;
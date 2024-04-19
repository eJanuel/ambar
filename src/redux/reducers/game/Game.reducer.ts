import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createGame, GamePayload } from '../../actions/Menu.actions';
import { startGame } from '../../actions/Game.action';
interface GameState {
    settings: {
      difficulty: string;
      narrator: string;
    }
    isGameRunning: boolean;
}

const initialState: GameState = {
    settings: {
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
    builder.addCase(createGame, (state, action: PayloadAction<GamePayload>) => {
      state.settings.difficulty = action.payload.difficulty;
      state.settings.narrator = action.payload.narrator;
    });
    builder.addCase(startGame, (state) => {
      state.isGameRunning = true;
    })
  },
});

export default gameSlice.reducer;
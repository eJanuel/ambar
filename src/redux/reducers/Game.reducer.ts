// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { Game } from '../utils/types';
// import { generateGame, loadGame } from '../utils/game/gameGenerator';

// interface GameState {/*...*/}

// const initialState: GameState = {/*...*/};

// export const generateNewGame = createAsyncThunk(
//   'game/generateNewGame',
//   async () => {
//     const game = generateGame();
//     return game;
//   }
// );

// export const loadExistingGame = createAsyncThunk(
//   'game/loadExistingGame',
//   async () => {
//     const game = loadGame();
//     return game;
//   }
// );

// const gameSlice = createSlice({
//   name: 'game',
//   initialState,
//   reducers: {/*...*/},
//   extraReducers: (builder) => {
//     builder.addCase(generateNewGame.fulfilled, (state, action) => {
//       state.game = action.payload;
//     });
//     builder.addCase(loadExistingGame.fulfilled, (state, action) => {
//       state.game = action.payload;
//     });
//   },
// });

// /*...*/
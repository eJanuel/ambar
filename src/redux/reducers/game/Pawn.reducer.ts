import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pawn } from '../../../game/logic/types/Pawn.types';
import { createGame, GamePayload } from '../../actions/Menu.actions';

interface PawnState {
  pawns: Pawn[];
}

const initialState: PawnState = {
  pawns: [],
};

const pawnSlice = createSlice({
  name: 'pawn',
  initialState,
  reducers: {
    createPawn(state, action: PayloadAction<Pawn>) {
      state.pawns.push(action.payload);
    },
    updatePawn(state, action: PayloadAction<Pawn>) {
      const index = state.pawns.findIndex((pawn) => pawn.entity.id === action.payload.entity.id);
      state.pawns[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame, (state, action: PayloadAction<GamePayload>) => {
      state.pawns = action.payload.pawns;
    })
  }
});

export const { createPawn, updatePawn } = pawnSlice.actions;
export default pawnSlice.reducer;

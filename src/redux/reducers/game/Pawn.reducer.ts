import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pawn } from '../../../game/types/Pawn.types';
import { populatePawns } from '../../actions/Pawn.actions';

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
    builder.addCase(populatePawns, (state, action: PayloadAction<Pawn[]>) => {
      state.pawns = action.payload;
    });
  }
});

export const { createPawn, updatePawn } = pawnSlice.actions;
export default pawnSlice.reducer;

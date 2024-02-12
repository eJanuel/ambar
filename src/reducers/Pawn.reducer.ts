import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateRandomPawn } from '../utils/functions/generators/Pawn.generator';
import { Pawn } from '../utils/types/Pawn.types';
import { RootState } from '../utils/types/Store.types';

interface PawnState {
  pawns: Pawn[];
  newPawnId: number;
}

const initialState: PawnState = {
  pawns: [],
  newPawnId: 0,
};

export const generateNewPawn = createAsyncThunk(
  'pawn/generateNewPawn',
  async (_, { getState }) => {
    const { newPawnId } = (getState() as RootState).pawn;
    const pawn = generateRandomPawn(`pawn${newPawnId}`, { x: 0, y: 0, z: 0 });
    return pawn;
  }
);

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
    builder.addCase(generateNewPawn.fulfilled, (state, action) => {
      state.pawns.push(action.payload);
    });
    builder.addCase(generateNewPawn.pending, (state) => {
      state.newPawnId += 1;
    });
  },
});

export const { createPawn, updatePawn } = pawnSlice.actions;
export default pawnSlice.reducer;

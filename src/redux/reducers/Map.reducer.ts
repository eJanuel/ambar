import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Map } from '../../game/logic/types/Map.types';
import { generateMap } from '../../game/logic/functions/generators/Map.generator';

interface MapState {
  worldmap: Map;
}

const initialState: MapState = {
  worldmap: {
    seed: '',
    dimensions: {
      size: 0,
      height: 0,
    },
    cells: [],
  }
};

export const generateNewMap = createAsyncThunk(
  'map/generateNewMap',
  async ({ seed, size, height, biome, caves, structures }: { seed?: string, size: number, height: number, biome: string, caves: boolean, structures: boolean }) => {
    const { grid, seed: generatedSeed } = generateMap(size, height, caves, seed);
    return { seed: generatedSeed, dimensions: { size, height }, cells: grid };
  }
);

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Map>) => {
      state.worldmap = action.payload;
    },
    updateMap: (state, action: PayloadAction<Map>) => {
      const { seed, dimensions, cells } = action.payload;
      state.worldmap = { seed, dimensions, cells };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateNewMap.fulfilled, (state, action) => {
      console.log("action", action);
      state.worldmap = action.payload;
    });
  },
});

export const { setMap, updateMap } = mapSlice.actions;
export default mapSlice.reducer;
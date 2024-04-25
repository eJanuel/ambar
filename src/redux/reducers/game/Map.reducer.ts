import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Map } from '../../../game/types/Map.types';
import { populateMap } from '../../actions/Map.actions';

interface MapState {
  gridMap: Map;
}

const initialState: MapState = {
  gridMap: {
    seed: '',
    dimensions: {
      size: 0,
      height: 0,
    },
    cells: [],
  }
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateMap: (state, action: PayloadAction<Map>) => {
      const { seed, dimensions, cells } = action.payload;
      state.gridMap = { seed, dimensions, cells };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(populateMap, (state, action: PayloadAction<Map>) => {
      state.gridMap = action.payload;
    });
  }
});

export const { updateMap } = mapSlice.actions;
export default mapSlice.reducer;
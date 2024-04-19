import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createGame, GamePayload } from '../../actions/Menu.actions';

import { Map } from '../../../game/logic/types/Map.types';

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

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateMap: (state, action: PayloadAction<Map>) => {
      const { seed, dimensions, cells } = action.payload;
      state.worldmap = { seed, dimensions, cells };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGame, (state, action: PayloadAction<GamePayload>) => {
      state.worldmap = action.payload.map;
    });
  }
});

export const { updateMap } = mapSlice.actions;
export default mapSlice.reducer;
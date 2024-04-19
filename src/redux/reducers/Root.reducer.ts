import { combineReducers } from 'redux';
import pawnReducer from './game/Pawn.reducer';
import mapReducer from './game/Map.reducer';
import uiReducer from './app/UI.reducer';
import MenuReducer from './app/Menu.reducer';
import GameReducer from './game/Game.reducer';
import ClockReducer from './game/Clock.reducer';

const rootReducer = combineReducers({
  game: GameReducer,
  menu: MenuReducer,
  pawn: pawnReducer,
  map: mapReducer,
  ui: uiReducer,
  clock: ClockReducer,
});

export default rootReducer;
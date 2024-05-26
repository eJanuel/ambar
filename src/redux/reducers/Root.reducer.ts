import { combineReducers } from 'redux';

import MenuReducer from './app/Menu.reducer';
import PawnReducer from './game/Pawn.reducer';
import MapReducer from './game/Map.reducer';
import UiReducer from './game/UI.reducer';
import GameReducer from './game/Game.reducer';
import ClockReducer from './game/Clock.reducer';
import DBReducer from './app/DB.reducer';

const rootReducer = combineReducers({
  db: DBReducer,
  menu: MenuReducer,
  game: GameReducer,
  pawn: PawnReducer,
  map: MapReducer,
  ui: UiReducer,
  clock: ClockReducer,
});

export default rootReducer;
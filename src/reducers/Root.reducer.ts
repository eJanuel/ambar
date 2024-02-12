import { combineReducers } from 'redux';
import pawnReducer from './Pawn.reducer';
import mapReducer from './Map.reducer';
import uiReducer from './UI.reducer';
import MenuReducer from './Menu.reducer';

const rootReducer = combineReducers({
  menu: MenuReducer,
  pawn: pawnReducer,
  map: mapReducer,
  ui: uiReducer,
});

export default rootReducer;
import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { startGame } from '../actions/Game.action';

export const SaveGameMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
  let result = next(action);

  if (action.type === startGame.type) {
    const state = storeAPI.getState();

    const savedGame = {
      map: state.map.worldmap,
      pawns: state.pawn.pawns,
      narrator: state.menu.narrator,
      difficulty: state.menu.difficulty,
    }

    localStorage.setItem('savedGameState', JSON.stringify(savedGame));
  }

  return result;
};


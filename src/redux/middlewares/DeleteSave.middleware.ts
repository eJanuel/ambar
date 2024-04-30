import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { deleteSave } from '../actions/Game.actions';

const DeleteSaveMiddleware: Middleware<{}, RootState> = () => next => (action: any) => {
  let result = next(action);

  if (action.type === deleteSave.type) {
    console.log('Deleting save:', action.payload.id, action.payload.index);

    const savedStorage = localStorage.getItem('savedGames');
    if (savedStorage !== null) {
      const savedGames = JSON.parse(savedStorage);
      const gameIndex = savedGames.findIndex((game: any) => game.id === action.payload.id);
      if (gameIndex !== -1) {
        savedGames[gameIndex].saves.splice(action.payload.index, 1);
        // savedGames.splice(gameIndex, 1);
        localStorage.setItem('savedGames', JSON.stringify(savedGames));
      }
    };
  };

  return result;
};

export default DeleteSaveMiddleware;
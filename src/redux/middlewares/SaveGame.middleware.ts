import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { saveGame } from '../actions/Game.actions';
import { GameSave } from '../../game/types/Game.types';

export const SaveGameMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
  let result = next(action);

  if (action.type === saveGame.type) {
    const state = storeAPI.getState();

    const savedGame: GameSave = {
      clock: {
        gameClock: state.clock.gameClock,
        gameMinutes: state.clock.gameMinutes,
        gameHours: state.clock.gameHours,
        gameDays: state.clock.gameDays,
        gameMonths: state.clock.gameMonths,
        gameYears: state.clock.gameYears,
      },
      map: state.map.gridMap,
      pawns: state.pawn.pawns,
      settings: {
        narrator: state.game.gameSettings.narrator,
        difficulty: state.game.gameSettings.difficulty,
      },
    };

    const savedStorage = localStorage.getItem('savedGames');
    if (savedStorage !== null) {
      const savedGames = JSON.parse(savedStorage);
      savedGames.find((game: any) => game.id === state.game.gameID).saves.push(savedGame);
      localStorage.setItem('savedGames', JSON.stringify(savedGames));
    };
  };

  return result;
};
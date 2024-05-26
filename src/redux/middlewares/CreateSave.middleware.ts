import { Middleware } from 'redux';

import { RootState } from '../types/Store.types';
import { createSave } from '../actions/Game.actions';

import { GameSave } from '../../types/Game.types';
import { Pawn } from '../../types/Pawn.types';
import OctreeMap from '../../functions/classes/OctreeMap.class';
import { IndexedDBHelper } from '../../helpers/IndexDB.helper';

const CreateSaveMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
  let result = next(action);

  if (action.type === createSave.type) {
    const saveName = action.payload;

    const state = storeAPI.getState();
    const { indexDB }: { indexDB: IndexedDBHelper } = state.db;
    const { gameID, gameName, gameSettings }: { gameID: string, gameName: string, gameSettings: { narrator: string, difficulty: string } } = state.game;
    const { gameClock, gameMinutes, gameHours, gameDays, gameMonths, gameYears }: { gameClock: number, gameMinutes: number, gameHours: number, gameDays: number, gameMonths: number, gameYears: number } = state.clock;
    const { cells, seed, dimensions }: { cells: OctreeMap, seed: string, dimensions: { size: number, height: number } } = state.map.gridMap;
    const { pawns }: { pawns: Pawn[] } = state.pawn;

    const saveID: string = new Date().getTime().toString();

    if (gameID !== null) {
      const gameSave: GameSave = {
        gameID,
        gameName,
        saveName,
        clock: {
          gameClock,
          gameMinutes,
          gameHours,
          gameDays,
          gameMonths,
          gameYears,

        },
        map: {
          cells: cells.toSerializable(),
          seed: seed.toString(),
          size: dimensions.size,
          height: dimensions.height,
        },
        pawns,
        settings: {
          narrator: gameSettings.narrator,
          difficulty: gameSettings.difficulty,
        },
      };

      indexDB.put("games", saveID, gameSave);
    };
  }

  return result;
};

export default CreateSaveMiddleware;
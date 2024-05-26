import { Middleware } from 'redux';

import { RootState } from '../types/Store.types';
import { loadSave } from '../actions/Game.actions';
import { populateGame, startGame } from '../actions/Game.actions';
import { populateMap } from '../actions/Map.actions';
import { populatePawns } from '../actions/Pawn.actions';
import { populateClock } from '../actions/Clock.actions';

import OctreeMap from '../../functions/classes/OctreeMap.class';
import { Map } from '../../types/Map.types';
import { IndexedDBHelper } from '../../helpers/IndexDB.helper';


const LoadSaveMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === loadSave.type) {
        const saveID: string = action.payload;

        const state = storeAPI.getState();
        const { indexDB }: { indexDB: IndexedDBHelper } = state.db;

        indexDB.get("games", saveID).then(gameData => {
            if (gameData) {
                const octreeMap = OctreeMap.fromSerializable(gameData.map.height, gameData.map.size, gameData.map);

                const map: Map = {
                    seed: gameData.map.seed.toString(),
                    dimensions: { size: gameData.map.size, height: gameData.map.height },
                    cells: octreeMap,
                };

                const gameState = { id: gameData.gameID, name: gameData.gameName, settings: gameData.settings }

                storeAPI.dispatch(populateGame(gameState));
                storeAPI.dispatch(populateMap(map));
                storeAPI.dispatch(populatePawns(gameData.pawns));
                storeAPI.dispatch(populateClock(gameData.clock));

                storeAPI.dispatch(startGame());
            }
        });
    }

    return result;
};

export default LoadSaveMiddleware;
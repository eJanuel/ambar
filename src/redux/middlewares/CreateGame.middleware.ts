import { Middleware } from 'redux';

import { RootState } from '../types/Store.types';
import { createGame } from '../actions/Game.actions';
import { populateMap } from '../actions/Map.actions';
import { populatePawns } from '../actions/Pawn.actions';
import { populateGame, startGame } from '../actions/Game.actions';

import { GameSave } from '../../types/Game.types';
import { Pawn } from '../../types/Pawn.types';
import { IndexedDBHelper } from '../../helpers/IndexDB.helper';


const CreateGameMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === createGame.type) {
        const state = storeAPI.getState();
        const { indexDB }: { indexDB: IndexedDBHelper } = state.db;

        if (action.payload.pawns.length > 0 && action.payload.map !== null) {
            const newGameID = new Date().getTime().toString();

            let pawns: Pawn[] = [];

            action.payload.pawns.forEach((pawn: Pawn, index: number) => {
                let tempPawn = JSON.parse(JSON.stringify(pawn));
                tempPawn.entity.position.x = index;
                tempPawn.entity.position.z = index;
                tempPawn.entity.position.y = action.payload.map.dimensions.height;

                pawns.push(tempPawn);
            });


            const newGameSave: GameSave = {
                gameID: newGameID,
                gameName: action.payload.name,
                saveName: "Initial Save",
                clock: {
                    gameClock: 0,
                    gameMinutes: 0,
                    gameHours: 0,
                    gameDays: 0,
                    gameMonths: 0,
                    gameYears: 0,
                },
                map: {
                    cells: action.payload.map.cells.toSerializable(),
                    seed: action.payload.map.seed.toString(),
                    size: action.payload.map.dimensions.size,
                    height: action.payload.map.dimensions.height,
                },
                pawns,
                settings: {
                    narrator: action.payload.settings.narrator,
                    difficulty: action.payload.settings.difficulty,
                },


            };

            indexDB.put("games", newGameID, newGameSave);

            storeAPI.dispatch(populateGame({ id: newGameID, name: action.payload.name, settings: action.payload.settings }));
            storeAPI.dispatch(populateMap(action.payload.map));
            storeAPI.dispatch(populatePawns(pawns));
            storeAPI.dispatch(startGame());
        }
    }

    return result;
};

export default CreateGameMiddleware;
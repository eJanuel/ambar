import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { createGame } from '../actions/Game.actions';
import { populateMap } from '../actions/Map.actions';
import { populatePawns } from '../actions/Pawn.actions';
import { populateGame, startGame } from '../actions/Game.actions';
import { GameSaveFolder } from '../../game/types/Game.types';

export const CreateGameMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === createGame.type) {
        if (action.payload.pawns.length > 0 && action.payload.map !== null) {
            const newID = new Date().getTime();

            const newGameSave: GameSaveFolder = {
                id: newID,
                name: action.payload.name,
                saves: [
                    {
                        clock: {
                            gameClock: 0,
                            gameMinutes: 0,
                            gameHours: 0,
                            gameDays: 0,
                            gameMonths: 0,
                            gameYears: 0,
                        },
                        map: action.payload.map,
                        pawns: action.payload.pawns,
                        settings: {
                            narrator: action.payload.settings.narrator,
                            difficulty: action.payload.settings.difficulty,
                        },
                    },
                ],
            };

            const savedStorage = localStorage.getItem('savedGames');
            const savedGames = savedStorage ? JSON.parse(savedStorage) : [];
            savedGames.push(newGameSave);
            localStorage.setItem('savedGames', JSON.stringify(savedGames));

            console.log('Game saved');

            storeAPI.dispatch(populateGame({ id: newID, name: action.payload.name, settings: action.payload.settings }));
            storeAPI.dispatch(populateMap(action.payload.map));
            storeAPI.dispatch(populatePawns(action.payload.pawns));
            storeAPI.dispatch(startGame());
        }
    }

    return result;
};
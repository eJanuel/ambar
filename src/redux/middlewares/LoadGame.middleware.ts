import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { GameLoadPayload, loadGame } from '../actions/Game.actions';
import { populateGame, startGame } from '../actions/Game.actions';
import { populateMap } from '../actions/Map.actions';
import { populatePawns } from '../actions/Pawn.actions';
import { populateClock } from '../actions/Clock.actions';

export const LoadGameMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === loadGame.type) {
        const payload: GameLoadPayload = action.payload;
        storeAPI.dispatch(populateGame({ id: payload.id, name: payload.name, settings: payload.save.settings }));
        storeAPI.dispatch(populateMap(payload.save.map));
        storeAPI.dispatch(populatePawns(payload.save.pawns));
        storeAPI.dispatch(populateClock(payload.save.clock));

        storeAPI.dispatch(startGame());
    }

    return result;
};
import { Middleware } from 'redux';
import { RootState } from '../types/Store.types';
import { createGame } from '../actions/Menu.actions';
import { startGame } from '../actions/Game.action';

export const GameStartMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === createGame.type) {
        const state = storeAPI.getState();

        if (state.pawn.pawns.length > 0 && state.map.worldmap !== null) {
            storeAPI.dispatch(startGame());
        }
    }

    return result;
};
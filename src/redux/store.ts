import { configureStore, Middleware, AnyAction, Dispatch } from '@reduxjs/toolkit';
import rootReducer from './reducers/Root.reducer';
import CreateGameMiddleware from './middlewares/CreateGame.middleware';
import CreateSaveMiddleware from './middlewares/CreateSave.middleware';
import LoadSaveMiddleware from './middlewares/LoadSave.middleware';
import DeleteSaveMiddleware from './middlewares/DeleteSave.middleware';
import { RootState } from './types/Store.types';
import { CreateGameAction, CreateSaveAction, DeleteSaveAction, LoadSaveAction, createGame } from './actions/Game.actions';
import DBUpgradeMiddleware from './middlewares/DBUpgrade.middleware';
import { populateMap } from './actions/Map.actions';
import UIDraggableMiddleware from './middlewares/UIDraggableMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'menu/generateNewMap/fulfilled',
        populateMap.type,
        createGame.type,
      ],
      ignoredPaths: [
        'db.localStorage',
        'db.indexDB',
        'map.gridMap.cells',
        'menu.newGameForm.mapForm.currentMap.cells',
      ],

    },
  }).concat(
    DBUpgradeMiddleware as Middleware<any, RootState, Dispatch<AnyAction>>,
    CreateGameMiddleware as Middleware<any, RootState, Dispatch<CreateGameAction>>,
    CreateSaveMiddleware as Middleware<any, RootState, Dispatch<CreateSaveAction>>,
    DeleteSaveMiddleware as Middleware<any, RootState, Dispatch<DeleteSaveAction>>,
    LoadSaveMiddleware as Middleware<any, RootState, Dispatch<LoadSaveAction>>,
    UIDraggableMiddleware as Middleware<any, RootState, Dispatch<AnyAction>>,
  ),
});

export { store };

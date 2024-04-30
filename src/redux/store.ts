import { configureStore, Middleware, AnyAction, Dispatch } from '@reduxjs/toolkit';
import rootReducer from './reducers/Root.reducer';
import CreateGameMiddleware from './middlewares/CreateGame.middleware';
import CreateSaveMiddleware from './middlewares/CreateSave.middleware';
import LoadSaveMiddleware from './middlewares/LoadSave.middleware';
import DeleteSaveMiddleware from './middlewares/DeleteSave.middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    CreateGameMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    CreateSaveMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    DeleteSaveMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    LoadSaveMiddleware as Middleware<any, any, Dispatch<AnyAction>>,

  ),
});

export { store };

import { configureStore, Middleware, AnyAction, Dispatch } from '@reduxjs/toolkit';
import rootReducer from './reducers/Root.reducer';
import { CreateGameMiddleware } from './middlewares/CreateGame.middleware';
import { SaveGameMiddleware } from './middlewares/SaveGame.middleware';
import { LoadGameMiddleware } from './middlewares/LoadGame.middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    CreateGameMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    SaveGameMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    LoadGameMiddleware as Middleware<any, any, Dispatch<AnyAction>>,

  ),
});

export { store };

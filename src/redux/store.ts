import { configureStore, Middleware, AnyAction, Dispatch } from '@reduxjs/toolkit';
import rootReducer from './reducers/Root.reducer';
import { GameStartMiddleware } from './middlewares/GameStart.middleware';
import { SaveGameMiddleware } from './middlewares/SaveGame.middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    GameStartMiddleware as Middleware<any, any, Dispatch<AnyAction>>,
    SaveGameMiddleware as Middleware<any, any, Dispatch<AnyAction>>
  ),
})

export default store;
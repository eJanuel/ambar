import { Middleware } from 'redux';

import { RootState } from '../types/Store.types';
import { deleteSave } from '../actions/Game.actions';
import { setRefreshDB } from '../reducers/app/Menu.reducer';

import { IndexedDBHelper } from '../../helpers/IndexDB.helper';

const DeleteSaveMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
  let result = next(action);

  if (action.type === deleteSave.type) {
    const saveID: string = action.payload;

    const state = storeAPI.getState();
    const { indexDB }: { indexDB: IndexedDBHelper } = state.db;

    indexDB.get("games", saveID).then(gameSave => {
      if (gameSave !== null) {
        indexDB.delete("games", saveID);
        storeAPI.dispatch(setRefreshDB(true));
      }
    });
  };

  return result;
};

export default DeleteSaveMiddleware;
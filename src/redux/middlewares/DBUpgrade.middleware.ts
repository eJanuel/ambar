import { Middleware } from "@reduxjs/toolkit";

import { RootState } from "../types/Store.types";
import { upgradeDB } from "../reducers/app/DB.reducer";

import { IndexedDBHelper } from "../../helpers/IndexDB.helper";
import { LocalStorageHelper } from "../../helpers/LocalStorage.helper";

const DBUpgradeMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === upgradeDB.type) {
        const state = storeAPI.getState();
        const { version, localStorage, indexDB }: { version: number, localStorage: LocalStorageHelper, indexDB: IndexedDBHelper  } = state.db;

        localStorage.put("dbVersion", version);
        indexDB.upgradeDB();
    }

    return result;
}

export default DBUpgradeMiddleware;
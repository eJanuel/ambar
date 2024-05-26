import { createSlice } from "@reduxjs/toolkit";
import { IndexedDBHelper } from "../../../helpers/IndexDB.helper";
import { LocalStorageHelper } from "../../../helpers/LocalStorage.helper";

export interface DBState {
    version: number;
    dbName: string;
    indexDB: IndexedDBHelper;
    localStorage: LocalStorageHelper;
}

const localStorageHelper = new LocalStorageHelper();
const versionFromStorage = localStorageHelper.get("dbVersion");

const initialState: DBState = {
    version: versionFromStorage || 1,
    dbName: 'games',
    indexDB: new IndexedDBHelper("AMBAR", versionFromStorage || 1),
    localStorage: localStorageHelper,
};

const DBSlice = createSlice({
    name: 'db',
    initialState,
    reducers: {
        upgradeDB: (state) => {
            state.version++;
        },
    },
});

export const { upgradeDB } = DBSlice.actions;
export default DBSlice.reducer;
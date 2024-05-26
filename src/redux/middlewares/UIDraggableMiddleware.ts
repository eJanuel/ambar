import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../types/Store.types";
import { updateDraggablePosition } from "../reducers/game/UI.reducer";
import { IndexedDBHelper } from "../../helpers/IndexDB.helper";

const UIDraggableMiddleware: Middleware<{}, RootState> = storeAPI => next => (action: any) => {
    let result = next(action);

    if (action.type === updateDraggablePosition.type) {
        const { id, position }: { id: number, position: { x: number, y: number } } = action.payload;
        const state = storeAPI.getState();
        const { indexDB }: { indexDB: IndexedDBHelper } = state.db;

        indexDB.put("settings", id.toString(), position);
    }

    return result;
}

export default UIDraggableMiddleware;
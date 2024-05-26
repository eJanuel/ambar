import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../types/Store.types';
import { toggleMapPreview, setMapFormInputs, setNarratorFormInputs } from "../../actions/Menu.actions";

import { generateMap } from "../../../functions/generators/Map.generator";
import { generateRandomPawn } from '../../../functions/generators/Pawn.generator';

import { Pawn } from "../../../types/Pawn.types";
import { Map } from "../../../types/Map.types";

export enum MenuDisplayablePages {
    MENU = 'menu',
    NEW_GAME = 'new_game',
    LOAD_GAME = 'load_game',
    SETTINGS = 'settings',
};

export enum NewGameFormSteps {
    MAP = 'map',
    NARRATOR = 'narrator',
    PAWN = 'pawn',
    GEAR = 'gear',
    SUMMARY = 'summary',
};


export interface MenuState {
    refreshDB: boolean;
    displayedPage: MenuDisplayablePages;
    newGameForm: {
        currentStep: NewGameFormSteps;
        mapForm: {
            isMapPreviewToggled: boolean;
            currentMap: Map | null;
            inputs: {
                seed: string;
                name: string;
                size: number;
                height: number;
            };
        };
        narratorForm: {
            inputs: {
                type: string;
                difficulty: string;
            };
        };
        pawnForm: {
            pawns: Pawn[];
            newPawnId: number;
        };
    };
};

const initialState: MenuState = {
    refreshDB: true,
    displayedPage: MenuDisplayablePages.MENU,
    newGameForm: {
        currentStep: NewGameFormSteps.MAP,
        mapForm: {
            isMapPreviewToggled: false,
            currentMap: null,
            inputs: {
                seed: '',
                name: 'New World',
                size: 64,
                height: 16,
            },
        },
        narratorForm: {
            inputs: {
                type: 'varied',
                difficulty: 'normal',
            },
        },
        pawnForm: {
            pawns: [],
            newPawnId: 0,
        },
    },
};

export const generateNewMap = createAsyncThunk(
    'menu/generateNewMap',
    async ({ seed, size, height }: { seed?: string, size: number, height: number }) => {
        const { map, generatedSeed } = generateMap(size, height, seed);
        return { seed: generatedSeed, dimensions: { size, height }, cells: map };
    }
);

export const generateNewPawn = createAsyncThunk(
    'pawn/generateNewPawn',
    async (_, { getState }) => {
        let pawnId = (getState() as RootState).menu.newGameForm.pawnForm.newPawnId;
        const pawn = generateRandomPawn(`pawn${pawnId}`, { x: 0, y: 0, z: 0 });

        return pawn;
    }
);

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setDisplayedPage: (state, action: PayloadAction<MenuDisplayablePages>) => {
            state.displayedPage = action.payload;
        },
        setGameFormStep: (state, action: PayloadAction<NewGameFormSteps>) => {
            state.newGameForm.currentStep = action.payload;
        },
        setRefreshDB: (state, action: PayloadAction<boolean>) => {
            state.refreshDB = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleMapPreview, (state) => {
            state.newGameForm.mapForm.isMapPreviewToggled = !state.newGameForm.mapForm.isMapPreviewToggled;
        });
        builder.addCase(setMapFormInputs, (state, action: PayloadAction<{ key: string, value: string | number | boolean }>) => {
            const { key, value } = action.payload;
            if (key === 'size' || key === 'height') {
                state.newGameForm.mapForm.inputs[key] = Number(value);
                return;
            }
            if (key === 'seed' || key === 'name') {
                state.newGameForm.mapForm.inputs[key] = String(value);
                return;
            }
        });
        builder.addCase(setNarratorFormInputs, (state, action: PayloadAction<{ key: string, value: string }>) => {
            const { key, value } = action.payload;
            if (key === 'type' || key === 'difficulty') {
                state.newGameForm.narratorForm.inputs[key] = value;
            }
        });
        builder.addCase(generateNewMap.fulfilled, (state, action) => {
            state.newGameForm.mapForm.currentMap = action.payload;
        });
        builder.addCase(generateNewPawn.fulfilled, (state, action) => {
            state.newGameForm.pawnForm.pawns.push(action.payload);
        });
        builder.addCase(generateNewPawn.pending, (state) => {
            state.newGameForm.pawnForm.newPawnId += 1;
        });
    },
});

export const { setDisplayedPage, setGameFormStep, setRefreshDB } = menuSlice.actions;

export default menuSlice.reducer;
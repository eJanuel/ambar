import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../types/Store.types';
import { setStep, toggleMapPreview, setMapFormInputs, setNarratorFormInputs } from "../../actions/Menu.actions";

import { generateMap } from "../../../game/functions/generators/Map.generator";
import { generateRandomPawn } from '../../../game/functions/generators/Pawn.generator';

import { Pawn } from "../../../game/types/Pawn.types";
import { Map } from "../../../game/types/Map.types";

interface MenuState {
    step: number;
    newGameForm: {
        mapForm: {
            isMapPreviewToggled: boolean;
            currentMap: Map | null;
            inputs: {
                seed: string;
                name: string;
                size: number;
                height: number;
                biome: string;
                caves: boolean;
                structures: boolean;
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
    step: 1,
    newGameForm: {
        mapForm: {
            isMapPreviewToggled: false,
            currentMap: null,
            inputs: {
                seed: '',
                name: 'New World',
                size: 16,
                height: 16,
                biome: 'plains',
                caves: true,
                structures: true,
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
    async ({ seed, name, size, height, biome, caves, structures }: { seed?: string, name: string, size: number, height: number, biome: string, caves: boolean, structures: boolean }) => {
        const { grid, seed: generatedSeed } = generateMap(size, height, caves, seed);
        return { seed: generatedSeed, dimensions: { size, height }, cells: grid };
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setStep, (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        });
        builder.addCase(toggleMapPreview, (state) => {
            state.newGameForm.mapForm.isMapPreviewToggled = !state.newGameForm.mapForm.isMapPreviewToggled;
        });
        builder.addCase(setMapFormInputs, (state, action: PayloadAction<{ key: string, value: string | number | boolean }>) => {
            const { key, value } = action.payload;
            if (key === 'size' || key === 'height') {
                state.newGameForm.mapForm.inputs[key] = Number(value);
                return;
            }
            if (key === 'caves' || key === 'structures') {
                state.newGameForm.mapForm.inputs[key] = Boolean(value);
                return;
            }
            if (key === 'seed' || key === 'name' || key === 'biome') {
                state.newGameForm.mapForm.inputs[key] = String(value);
                return;
            }
        });
        builder.addCase(generateNewMap.fulfilled, (state, action) => {
            state.newGameForm.mapForm.currentMap = action.payload;
        });
        builder.addCase(setNarratorFormInputs, (state, action: PayloadAction<{ key: string, value: string }>) => {
            const { key, value } = action.payload;
            if (key === 'type' || key === 'difficulty') {
                state.newGameForm.narratorForm.inputs[key] = value;
            }
        });
        builder.addCase(generateNewPawn.fulfilled, (state, action) => {
            state.newGameForm.pawnForm.pawns.push(action.payload);
        });
        builder.addCase(generateNewPawn.pending, (state) => {
            state.newGameForm.pawnForm.newPawnId += 1;
        });
    },
});

export default menuSlice.reducer;
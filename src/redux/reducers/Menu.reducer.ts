import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Map } from "../../game/logic/types/Map.types";
import { setStep, toggleMapPreview, setPreviewMap, setMapFormInputs, setNarratorFormInputs } from "../actions/Menu.actions";
import { generateMap } from "../../game/logic/functions/generators/Map.generator";
import { Pawn } from "../../game/logic/types/Pawn.types";

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
        },
    },
};

export const generateNewMap = createAsyncThunk(
    'menu/generateNewMap',
    async ({ seed, name, size, height, biome, caves, structures }: { seed?: string, name: string, size: number, height: number, biome: string, caves: boolean, structures: boolean }) => {
        console.log(seed, name, size, height, biome, caves, structures);
        const { grid, seed: generatedSeed } = generateMap(size, height, seed);
        return { seed: generatedSeed, dimensions: { size, height }, cells: grid };
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
        builder.addCase(setPreviewMap, (state, action: PayloadAction<Map>) => {
            state.newGameForm.mapForm.currentMap = action.payload;
        });
        builder.addCase(setMapFormInputs, (state, action: PayloadAction<{ key: string, value: string | number | boolean }>) => {
            const { key, value } = action.payload;
            console.log(key, value);
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
    },
});

export default menuSlice.reducer;
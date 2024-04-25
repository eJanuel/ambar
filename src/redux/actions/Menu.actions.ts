import { createAction } from '@reduxjs/toolkit';

interface MapInputPayloadString {
  key: 'seed' | 'name' | 'biome';
  value: string;
}

interface MapInputPayloadNumber {
  key: 'size' | 'height';
  value: number;
}

interface MapInputPayloadBoolean {
  key: 'caves' | 'structures';
  value: boolean;
}

interface NarratorInputPayload {
  key: 'type' | 'difficulty';
  value: string;

}

interface PawnInputPayload {
  key: 'pawns';
  value: string;
}

export const setStep = createAction<number>('menu/setStep');
export const toggleMapPreview = createAction('menu/toggleMapPreview');
export const setMapFormInputs = createAction('menu/setMapFormInputs', (payload: MapInputPayloadString | MapInputPayloadNumber | MapInputPayloadBoolean) => ({
  payload,
}));
export const setNarratorFormInputs = createAction('menu/setNarratorFormInputs', (payload: NarratorInputPayload) => ({
  payload,
}));
export const setPawnFormInputs = createAction('menu/setPawnFormInputs', (payload: PawnInputPayload) => ({
  payload,
}));
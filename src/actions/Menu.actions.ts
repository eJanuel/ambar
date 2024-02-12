import { createAction } from '@reduxjs/toolkit';
import { Map } from '../utils/types/Map.types';


interface mapInputPayloadString {
  key: 'seed' | 'name' | 'biome';
  value: string;
}

interface mapInputPayloadNumber {
  key: 'size' | 'height';
  value: number;
}

interface mapInputPayloadBoolean {
  key: 'caves' | 'structures';
  value: boolean;
}

interface narratorInputPayload {
  key: 'type' | 'difficulty';
  value: string;

}

interface pawnInputPayload {
  key: 'pawns';
  value: string;
}

export const setStep = createAction<number>('menu/setStep');
export const toggleMapPreview = createAction('menu/toggleMapPreview');
export const setPreviewMap = createAction<Map>('menu/setPreviewMap');
export const setMapFormInputs = createAction('menu/setMapFormInputs', (payload: mapInputPayloadString | mapInputPayloadNumber | mapInputPayloadBoolean) => ({
  payload,
}));
export const setNarratorFormInputs = createAction('menu/setNarratorFormInputs', (payload: narratorInputPayload) => ({
  payload,
}));
export const setPawnFormInputs = createAction('menu/setPawnFormInputs', (payload: pawnInputPayload) => ({
  payload,
}));
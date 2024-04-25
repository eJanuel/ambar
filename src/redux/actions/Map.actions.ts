import { createAction } from '@reduxjs/toolkit';
import { Map } from '../../game/types/Map.types';


export const toggleBlockVisibility = createAction<number>('map/toggleBlockVisibility');
export const populateMap = createAction<Map>('map/populateMap');
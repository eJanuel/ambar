import { createAction } from '@reduxjs/toolkit';


export const toggleBlockVisibility = createAction<number>('map/toggleBlockVisibility');
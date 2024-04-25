import { createAction } from "@reduxjs/toolkit";

export interface ClockPopulatePayload {
    gameClock: number;
    gameMinutes: number;
    gameHours: number;
    gameDays: number;
    gameMonths: number;
    gameYears: number;
}

export const populateClock = createAction<ClockPopulatePayload>("clock/populateClock");
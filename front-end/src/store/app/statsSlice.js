import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        statsX: [],
        statsY: []
    },
    reducers: {
        onLoadStatsX: (state, {payload = []} ) => {
            state.statsX = payload;
        },
        onLoadStatsY: (state, {payload = []} ) => {
            state.statsY = payload;
        },
        onLogoutStats: (state) => {
            state.statsX = [];
            state.statsY = [];
        },
    }
});

export const { onLoadStatsX, onLoadStatsY, onLogoutStats } = statsSlice.actions;
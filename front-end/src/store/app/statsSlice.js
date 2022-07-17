import { createSlice } from '@reduxjs/toolkit';

export const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        stats: [],
        statsX: [],
        statsY: [],
        albumCount: 0,
        photoCount: 0
    },
    reducers: {
        onLoadStats: (state, {payload = []} ) => {
            state.stats = payload;
        },
        onLoadStatsX: (state, {payload = []} ) => {
            state.statsX = payload;
        },
        onLoadStatsY: (state, {payload = []} ) => {
            state.statsY = payload;
        },
        onLoadAlbumCount: (state, {payload = 0} ) => {
            state.albumCount = payload;
        },
        onLoadPhotoCount: (state, {payload = 0} ) => {
            state.photoCount = payload;
        },
        onLogoutStats: (state) => {
            state.stats = [],
            state.statsX = [];
            state.statsY = [];
            state.albumCount = 0;
            state.photoCount = 0;
        },
    }
});

export const { onLoadStats, onLoadStatsX, onLoadStatsY, onLogoutStats, onLoadAlbumCount, onLoadPhotoCount } = statsSlice.actions;
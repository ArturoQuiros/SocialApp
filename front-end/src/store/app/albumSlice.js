import { createSlice } from '@reduxjs/toolkit';

export const albumSlice = createSlice({
    name: 'album',
    initialState: {
        isLoadingAlbums: true,
        albums: [],
        activeAlbum: null
    },
    reducers: {
        onSetActiveAlbum: (state, {payload} ) => {
            state.activeAlbum = payload;
        },
        onAddNewAlbum: (state, {payload} ) => {
            state.albums.push(payload);
            state.activeAlbum = null;
        },
        onUpdateAlbum: (state, {payload} ) => {
            state.albums = state.albums.map( album => {

                if(album.id === payload.id){
                    return payload;
                }

                return album;
            });
        },
        onDeleteAlbum: (state) => {
            if (state.activeAlbum){
                state.albums = state.albums.filter(album => album.id !== state.activeAlbum.id);
                state.activeAlbum = null;
            }
        },
        onLoadAlbums: (state, {payload = []} ) => {
            state.isLoadingAlbums = false;
            //state.albums = payload;
            payload.forEach(album => {
                const exists = state.albums.some(dbAlbum => dbAlbum.id === album.id);
                if (!exists){
                    state.albums.push(album);
                }
            })
        },
        onSearchAlbums: (state, {payload = []} ) => {
            state.isLoadingAlbums = false;
            state.albums = payload;
        },
        onLogoutAlbums: (state) => {
            state.isLoadingAlbums = true;
            state.albums = [];
            state.activeAlbum = null;
        },
    }
});

export const { onSetActiveAlbum, onLoadAlbums, onSearchAlbums, onLogoutAlbums, onAddNewAlbum, onUpdateAlbum, onDeleteAlbum } = albumSlice.actions;
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
        // onAddNewEvent: (state, {payload} ) => {
        //     state.events.push(payload);
        //     state.activeEvent = null;
        // },
        // onUpdateEvent: (state, {payload} ) => {
        //     state.events = state.events.map( event => {

        //         if(event.id === payload.id){
        //             return payload;
        //         }

        //         return event;
        //     });
        // },
        // onDeleteEvent: (state) => {
        //     if (state.activeEvent){
        //         state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        //         state.activeEvent = null;
        //     }
        // },
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

export const { onSetActiveAlbum, onLoadAlbums, onSearchAlbums, onLogoutAlbums } = albumSlice.actions;
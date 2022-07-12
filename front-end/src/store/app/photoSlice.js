import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        isLoadingPhotos: true,
        photos: [],
        activePhoto: null
    },
    reducers: {
        onSetActivePhoto: (state, {payload} ) => {
            state.activePhoto = payload;
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
        onLoadPhotos: (state, {payload = []} ) => {
            state.isLoadingPhotos = false;
            //state.photos = payload;
            payload.forEach(photo => {
                const exists = state.photos.some(dbPhoto => dbPhoto.id === photo.id);
                if (!exists){
                    state.photos.push(photo);
                }
            })
        },
        onSearchPhotos: (state, {payload = []} ) => {
            state.isLoadingPhotos = false;
            state.photos = payload;
        },
        onLogoutPhotos: (state) => {
            state.isLoadingPhotos = true;
            state.photos = [];
            state.activePhoto = null;
        },
    }
});

export const { onSetActivePhoto, onLoadPhotos, onLogoutPhotos, onSearchPhotos } = photoSlice.actions;
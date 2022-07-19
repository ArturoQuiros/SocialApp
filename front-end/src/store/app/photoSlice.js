import { createSlice } from '@reduxjs/toolkit';

export const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        isSaving: false,
        isDeleting: false,
        isLoadingPhotos: true,
        photos: [],
        activePhoto: null
    },
    reducers: {
        savingNewPhoto: (state) => {
            state.isSaving = true;
        },
        deletingPhoto: (state) => {
            state.isDeleting = true;
        },
        onSetActivePhoto: (state, {payload} ) => {
            state.activePhoto = payload;
        },
        onAddNewPhoto: (state, {payload} ) => {

            const segments = payload.url.split('upload');
            payload.thumbnail = segments[0] + "upload/c_fill,h_300,w_300" + segments[1];

            state.photos.push(payload);
            state.activePhoto = null;
            state.isSaving = false;
        },
        onUpdatePhoto: (state, {payload} ) => {
            state.photos = state.photos.map( photo => {

                if(photo.id === payload.id){
                    return payload;
                }

                return photo;
            });
        },
        onDeletePhoto: (state) => {
            if (state.activePhoto){
                state.photos = state.photos.filter(photo => photo.id !== state.activePhoto.id);
                state.activePhoto = null;
                state.isDeleting = false;
            }
        },
        onDeleteAllPhotosOfAlbum: (state) => {
            state.photos = [];
            state.activePhoto = null;
            state.isDeleting = false;
        },
        onClearPhotos: (state, {payload = []} ) => {
            state.photos = [];
        },
        onLoadPhotos: (state, {payload = []} ) => {
            state.isLoadingPhotos = false;
            //state.photos = payload;
            state.photos = [];

            payload.forEach(photo => {
                const segments = photo.url.split('upload');
                photo.thumbnail = segments[0] + "upload/c_fill,h_300,w_300" + segments[1];
            });

            payload.forEach(photo => {
                const exists = state.photos.some(dbPhoto => dbPhoto.id === photo.id);
                if (!exists){
                    state.photos.push(photo);
                }
            })
            
        },
        onSearchPhotos: (state, {payload = []} ) => {
            state.isLoadingPhotos = false;

            payload.forEach(photo => {
                const segments = photo.url.split('upload');
                photo.thumbnail = segments[0] + "upload/c_fill,h_300,w_300" + segments[1];
            });

            state.photos = payload;
            state.isSaving = false;
        },
        onLogoutPhotos: (state) => {
            state.isLoadingPhotos = true;
            state.photos = [];
            state.activePhoto = null;
        },
    }
});

export const { savingNewPhoto, deletingPhoto, onSetActivePhoto, onClearPhotos, onLoadPhotos, onLogoutPhotos, 
    onSearchPhotos, onAddNewPhoto, onUpdatePhoto, onDeletePhoto, onDeleteAllPhotosOfAlbum } = photoSlice.actions;
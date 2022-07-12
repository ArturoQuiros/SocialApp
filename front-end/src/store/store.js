import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "./app/albumSlice";
import { photoSlice } from "./app/photoSlice";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        albums: albumSlice.reducer,
        photos: photoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
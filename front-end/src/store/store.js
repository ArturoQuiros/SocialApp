import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "./app/albumSlice";
import { photoSlice } from "./app/photoSlice";
import { statsSlice } from "./app/statsSlice";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        albums: albumSlice.reducer,
        photos: photoSlice.reducer,
        stats: statsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
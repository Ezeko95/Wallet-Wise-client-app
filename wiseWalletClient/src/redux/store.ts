import {configureStore} from "@reduxjs/toolkit";
import sliceReducer from "./slices/Slice";


export const store = configureStore({
    reducer:{
        wallet: sliceReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
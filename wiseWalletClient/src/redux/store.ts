/* import {configureStore} from "@reduxjs/toolkit";
import sliceReducer from "./slices/Slice";


export const store = configureStore({
    reducer:{
        wallet: sliceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; */
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import movementReducer from './features/movementSlice';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    movement: movementReducer,
  },
  middleware: [thunk],
});

/* export type AppDispatch = typeof store.dispatch; */
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;

export default store;

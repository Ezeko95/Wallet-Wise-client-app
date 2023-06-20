import movementReducer from './features/movementSlice';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

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


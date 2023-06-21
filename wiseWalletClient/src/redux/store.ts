import movementReducer from './features/movementSlice';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { usersSlice } from './features/getUser';


const store = configureStore({
  reducer: {
    movement: movementReducer,
    user: usersSlice.reducer
    
  },
  middleware: [thunk],
});

//  export type AppDispatch = typeof store.dispatch; 
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;


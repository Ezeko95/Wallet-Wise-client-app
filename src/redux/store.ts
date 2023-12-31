import movementReducer from './slices/movementSlice';
import allMovementsReducer from './slices/allMovementsSlice';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { usersSlice } from './slices/getUsers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { onBoardingSlice } from './slices/onBoarding';
import goalSlice from './slices/goalSlice';
import sharedSlice from './slices/sharedSlice';
import postAccount from './slices/postAccount';
 
const store = configureStore({
  reducer: {
    allMovements: allMovementsReducer,
    movement: movementReducer,
    user: usersSlice.reducer,
    onBoarding: onBoardingSlice.reducer,
    goal: goalSlice,
    share: sharedSlice,
    account: postAccount
  },
  middleware: [thunk],
  devTools: true
});


//  export type AppDispatch = typeof store.dispatch; 
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void>= ThunkAction< 
ReturnType,
RootState,
unknown,
Action<string>
>

export default store;


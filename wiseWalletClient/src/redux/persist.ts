// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
// import { configureStore, Store } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import movementReducer from './slices/movementSlice';

// import onBoardingReducer, { onBoardingSlice } from './slices/onBoarding'; // Import your onBoarding reducer
// import allMovementsReducer from './slices/allMovementsSlice';
// import { usersSlice } from './slices/getUsers';

// // Define the persisted state config
// const persistConfig: PersistConfig<RootState> = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const rootReducer = {
//   allMovements: allMovementsReducer,
//   movement: movementReducer,
//   user: usersSlice.reducer,
//   onBoarding: onBoardingSlice.reducer,
// };

// // Create the persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Define the root state
// interface RootState {
//   onBoarding: ReturnType<typeof onBoardingReducer>;
//   // Define other state properties for your other reducers here
// }

// // Create the store with the root state
// export const store: Store = configureStore({
//   reducer: persistedReducer,
// });

// // Create the persistor
// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { cityReducer, packageReducer, infoReducer } from './slices';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    package: packageReducer,
    info: infoReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
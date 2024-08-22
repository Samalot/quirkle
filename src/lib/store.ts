import { configureStore } from '@reduxjs/toolkit';
import favouriteSlice from './features/favouriteSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      favourite: favouriteSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
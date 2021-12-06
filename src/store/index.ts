/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 06 2021
 * @ Time: 14:46
 */

import { configureStore } from '@reduxjs/toolkit';

import gameSlice from '@/features/game/gameSlice';

export const store = configureStore({
  reducer: {
    [gameSlice.name]: gameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

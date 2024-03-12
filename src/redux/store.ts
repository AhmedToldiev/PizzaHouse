import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import card from './slices/card/slice';
import pizza from './slices/pizza/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    card,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

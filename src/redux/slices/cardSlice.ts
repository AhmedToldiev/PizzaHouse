import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCardFromLocalStorage } from '../../utils/getCardFromLocalStorage';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
const { totalPrice, items } = getCardFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCard = (state: RootState) => state.card;

export const { addItem, removeItem, clearItems, minusItem } = cardSlice.actions;

export default cardSlice.reducer;

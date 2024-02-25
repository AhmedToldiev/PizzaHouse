import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortby, order, category, currentPage } = params;
  const { data } = await axios.get(
    `https://65cb1d59efec34d9ed86c07b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortby}&order=${order}`,
  );
  return data;
});

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, action) => {
        console.log(state, 'Идет отправка запроса');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        console.log(state, 'Все ок');
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.log(state, 'Была ошибка');
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

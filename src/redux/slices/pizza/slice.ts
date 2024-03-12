import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pizza, PizzaAliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaAliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchPizzas.pending, (state) => {
  //       state.status = 'loading';
  //       state.items = [];
  //     })
  //     .addCase(fetchPizzas.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //       state.status = 'success';
  //     })
  //     .addCase(fetchPizzas.rejected, (state) => {
  //       state.status = 'error';
  //       state.items = [];
  //     });
  // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

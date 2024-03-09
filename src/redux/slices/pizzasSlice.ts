import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category,search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://65cb1d59efec34d9ed86c07b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzaAliceState {
  items: Pizza[];
  status: Status;
}

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

export const selectCardItemById = (id: string) => (state: RootState) =>
  state.card.items.find((obj) => obj.id === id);
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

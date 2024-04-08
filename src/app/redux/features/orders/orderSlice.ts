// slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, fetchOrderById } from "./orderActions";

const initialState = {
  orders: [],
  loading: false,
  error: { payload: null, status: false },
  selectedOrder: {},
  selectLoading: false,
  response: false,
};

const ordersReducer = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload as any;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });

    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.selectLoading = true;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.selectLoading = false;
      state.loading = false;
      state.selectedOrder = action.payload as any;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.selectLoading = false;
      state.loading = false;
      state.error = { payload: action.error as any, status: true };
    });

  },
});



export default ordersReducer.reducer;

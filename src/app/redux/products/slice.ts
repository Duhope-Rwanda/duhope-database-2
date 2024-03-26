import { createSlice } from '@reduxjs/toolkit';
import { fetch_products, get_product_by_id } from './actions';
import type { TProduct } from './types';

type TInitialState = {
	products: TProduct[];
	selected_product: TProduct | undefined;
	loading: boolean;
	error: { payload: any | undefined; status: boolean };
};

const initial_state: TInitialState = {
	products: [],
	selected_product: undefined,
	loading: false,
	error: { payload: undefined, status: false }
};

const products_reducer = createSlice({
	name: 'products',
	initialState: initial_state,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetch_products.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetch_products.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload as TProduct[];
		});
		builder.addCase(fetch_products.rejected, (state, action) => {
			state.loading = false;
			state.error = { payload: action.error as any, status: true };
		});

		// get product by id
		builder.addCase(get_product_by_id.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(get_product_by_id.fulfilled, (state, action) => {
			state.loading = false;
			state.selected_product = action.payload as TProduct;
		});
		builder.addCase(get_product_by_id.rejected, (state, action) => {
			state.loading = false;
			state.error = { payload: action.error as any, status: true };
		});
	}
});

const product_slice = products_reducer.reducer;
export default product_slice;

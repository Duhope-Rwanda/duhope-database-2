import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import orderReducer from './features/orders/orderSlice';
import productSlice from './features/products/productSlice';
import usersSlice from './features/users/usersSlice';
import categoriesSlice from './features/categories/categoriesSlice';
import product_slice from './products/slice';
import groupsSlice from './features/groups/groupsSlice';
import womenSlice from './features/women/womenSlice';
import cohortsSlice from './features/cohorts/cohortsSlice';

const store = configureStore({
	reducer: {
		// llg: getUserByUserId,
		auth: authReducer,
		orders: orderReducer,
		order: orderReducer,
		products: productSlice,
		productsV2: product_slice,
		users: usersSlice,
		categories: categoriesSlice,
		groups: groupsSlice,
		women: womenSlice,
		cohort: cohortsSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

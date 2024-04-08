import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, doc, collection, addDoc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { TProduct } from './types';
import { delete_images } from '../../modules/apps/products/utils';

export const fetch_products = createAsyncThunk('products/fetch_products', async () => {
	try {
		const products_collection = collection(db, 'products');
		const snapshot = await getDocs(products_collection);
		const products_data = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

		return products_data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
});

export const add_product = createAsyncThunk('products/add_product', async (product: TProduct) => {
	try {
		const products_collection = collection(db, `products`);
		await addDoc(products_collection, product);
		return true;
	} catch (error) {
		return error;
	}
});

export const get_product_by_id = createAsyncThunk(
	'products/get_product_by_id',
	async (product_id: string | undefined) => {
		try {
			if (!product_id) {
				throw new Error('Invalid product_id');
			}

			const product_ref = doc(db, 'products', product_id);
			const product_snap = await getDoc(product_ref);

			if (product_snap.exists()) {
				const product = product_snap.data();
				return product;
			} else {
				throw new Error('Product not found');
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const edit_product = createAsyncThunk('products/edit_product', async (product: TProduct) => {
	try {
		if (product.id === undefined) return false;
		const product_ref = doc(db, 'products', product.id);
		await updateDoc(product_ref, product);
		return true;
	} catch (error) {
		return error;
	}
});

export const delete_product = createAsyncThunk(
	'products/delete_product',
	async (product_id: string) => {
		try {
			const product_ref = doc(db, 'products', product_id);
			const product_snap = await getDoc(product_ref);
			const images = product_snap.data()?.images;
			await Promise.all([delete_images(images), deleteDoc(product_ref)]);
			return true;
		} catch (error) {
			return error;
		}
	}
);

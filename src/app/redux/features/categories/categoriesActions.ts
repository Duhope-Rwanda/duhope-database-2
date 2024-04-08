import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	doc,
	collection,
	addDoc,
	deleteDoc,
	onSnapshot,
	updateDoc,
	getDoc
} from 'firebase/firestore'; // Import your Firebase configuration
import { db } from '../../../firebase';
import { delete_images } from '../../../modules/apps/products/utils';
import { setLoading, setCategories } from './categoriesSlice'
// edit category
type Params = {
	data: any;
	id: string;
};
// get categories
export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	 async (_, { dispatch }) => {
	try {
		dispatch(setLoading(true));
		const categoriesCollection = collection(db, 'categories');
		const unsubscribe = onSnapshot(categoriesCollection, (snapshot) => {
			const categoriesData: any = snapshot.docs.map((doc: any) => ({
			  id: doc.id, // Add the document ID to each product object
			  ...doc.data(),
			}));
			// Dispatch an action to update the products in Redux store
			dispatch(setCategories(categoriesData));
			dispatch(setLoading(false));
		  });
				// Return the unsubscribe function to clean up the listener when needed
		  return unsubscribe;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
});

export const editCategory = createAsyncThunk(
	'categories/editCategory',
	async ({ data, id }: Params) => {
		try {
			const categoryRef = doc(db, 'categories', id);
			await updateDoc(categoryRef, data);
			return true;
		} catch (error) {
			return error;
		}
	}
);

//  delete category
export const deleteCategory = createAsyncThunk(
	'categories/deleteCategory',
	async (category_id: string) => {
		try {
			const category_ref = doc(db, 'categories', category_id);
			const category_snap = await getDoc(category_ref);
			const image = category_snap.data()?.image;
			await Promise.all([delete_images(image), deleteDoc(category_ref)]);
		} catch (error) {
			return error;
		}
	}
);

// add category
export const addCategory = createAsyncThunk('categories/addCategory', async (category: any) => {
	try {
		const categoriesCollection = collection(db, `categories`);
		await addDoc(categoriesCollection, category);
		return true;
	} catch (error) {
		return error;
	}
});

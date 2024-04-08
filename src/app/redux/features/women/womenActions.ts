import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	doc,
	collection,
	addDoc,
	deleteDoc,
	onSnapshot,
	updateDoc,
	getDoc,
} from 'firebase/firestore'; // Import your Firebase configuration
import { db } from '../../../firebase';
import { delete_images } from '../../../modules/apps/products/utils';
import { setLoading, setWomen } from './womenSlice'
// edit group
type Params = {
	data: any;
	id: string;
};
// get women
export const fetchWomen = createAsyncThunk(
	'women/fetchWomen',
	 async (_, { dispatch }) => {
	try {
		dispatch(setLoading(true));
		const womenCollection = collection(db, 'women');
    const unsubscribe = onSnapshot(womenCollection, (snapshot) => {
			const womenData: any = snapshot.docs.map((doc: any) => (
        {
			  id: doc.id,
			  ...doc.data(),
			}));
			dispatch(setWomen(womenData));
			dispatch(setLoading(false));
		  });
    return unsubscribe;
	} catch (error) {
		console.error('Error fetching groups:', error);
		throw error;
	}
});

// edit women
export const editWoman = createAsyncThunk(
	'women/editWomen',
	async ({ data, id }: Params) => {
		try {
			const womenRef = doc(db, 'women', id);
			await updateDoc(womenRef, data);
			return true;
		} catch (error) {
			return error;
		}
	}
);

//  delete woman
export const deleteWoman = createAsyncThunk(
	'women/deleteWoman',
	async (id: string) => {
		try {
			const woman_ref = doc(db, 'women', id);
			const woman_snap = await getDoc(woman_ref);
			const image = woman_snap.data()?.image;
			await Promise.all([delete_images(image), deleteDoc(woman_ref)]);
		} catch (error) {
			return error;
		}
	}
);

// add woman
export const addWoman = createAsyncThunk('women/addWoman', async (woman: any) => {
	try {
		const womenCollection = collection(db, `woman`);
		await addDoc(womenCollection, woman);
		return true;
	} catch (error) {
		return error;
	}
});

// get a woman by Id

export const getWomanById = createAsyncThunk('women/getWomanById', async (id: string) => {
	try {
		const womenRef = doc(db, `women/${id}`);
		const womenSnap = await getDoc(womenRef);

		return { ...womenSnap.data()};
	} catch (error) {
		return error;
	}
});
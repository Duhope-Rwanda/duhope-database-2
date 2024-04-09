import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	doc,
	collection,
	addDoc,
	deleteDoc,
	onSnapshot,
	updateDoc,
	getDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { delete_images } from '../../../modules/apps/products/utils';
import { setLoading, setCohorts } from './cohortsSlice'
// edit cohorts
type Params = {
	data: any;
	id: string;
};
// get cohorts
export const fetchCohorts = createAsyncThunk(
	'cohorts/fetchCohorts',
	 async (_, { dispatch }) => {
	try {
		dispatch(setLoading(true));
		const cohortsCollection = collection(db, 'cohorts');
		const unsubscribe = onSnapshot(cohortsCollection, (snapshot) => {
			const cohortsData: any = snapshot.docs.map((doc: any) => ({
			  id: doc.id,
			  ...doc.data(),
			}));
			dispatch(setCohorts(cohortsData));
			dispatch(setLoading(false));
		  });
		  return unsubscribe;
	} catch (error) {
		console.error('Error fetching cohorts:', error);
		throw error;
	}
});

//  edit cohorts
export const editCohort = createAsyncThunk(
	'cohorts/editCohort',
	async ({ data, id }: Params) => {
		try {
			const cohortRef = doc(db, 'cohorts', id);
			await updateDoc(cohortRef, data);
			return true;
		} catch (error) {
			return error;
		}
	}
);

//  delete cohorts
export const deleteGroup = createAsyncThunk(
	'cohorts/deleteCohort',
	async (id: string) => {
		try {
			const cohort_ref = doc(db, 'cohorts', id);
			const cohort_snap = await getDoc(cohort_ref);
			// const image = cohort_snap.data()?.image;
			// await Promise.all([delete_images(image), deleteDoc(cohort_ref)]);
		} catch (error) {
			return error;
		}
	}
);

// add cohort
export const addCohort = createAsyncThunk('cohorts/addCohort', async (cohort: any) => {
	try {
		const cohortsCollection = collection(db, `cohorts`);
		await addDoc(cohortsCollection, cohort);
		return true;
	} catch (error) {
		return error;
	}
});
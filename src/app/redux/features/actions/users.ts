import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../../firebase';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	try {
		const usersCollection = collection(db, `users`);
		const users = await getDocs(usersCollection);

		let usersData: { id: string }[] = [];

		for (const user of users.docs) {
			usersData.push({ id: user.id, ...user.data() });
		}

		return usersData;
	} catch (error) {
		return error;
	}
});

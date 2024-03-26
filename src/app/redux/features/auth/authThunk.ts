import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { UserProps } from '../../../types/app.type';

//user logout
export const logout = createAsyncThunk('auth/logout', async () => {
	await signOut(auth);
});

//Google sign-in
export const googleSignIn = createAsyncThunk('auth/googleSignIn', async () => {
	const googleAuthProvider = new GoogleAuthProvider();
	await signInWithPopup(auth, googleAuthProvider);
});

// Email and password login
export const emailPasswordLogin = createAsyncThunk(
	'auth/emailPasswordLogin',
	async ({ email, password }: { email: string; password: string }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			if (error) {
				return 'Invalid Credentials';
			}
		}
	}
);

// Function to save user profile data to Firestore
const saveUserProfileToDatabase = async (uid: string | undefined, email: string, names: string) => {
	try {
		// Reference to the Firestore collection for user profiles
		const userCollection = collection(db, `users`);

		// Reference to the specific user document using their UID
		const userRef = doc(userCollection, uid);

		// Save the user's email, names, profile_url, and role to the Firestore document
		await setDoc(userRef, {
			email,
			names,
			profile_url: '',
			role: '',
			userId: uid
		});
	} catch (error) {
		throw error;
	}
};

// Email and password registration
export const emailPasswordRegistration = createAsyncThunk(
	'auth/emailPasswordRegistration',
	async ({ email, names, password }: { email: string; names: string; password: string }) => {
		try {
			// Register the user with Firebase authentication
			const userCredential: any = await createUserWithEmailAndPassword(auth, email, password);

			// Save the user's email and names to Firestore
			const uid = userCredential.user.uid;

			await saveUserProfileToDatabase(uid, email, names);

			// Return the user's UID along with their email and names
			return { uid, email, names };
		} catch (error) {
			throw error;
		}
	}
);

export const getUserByUserId = createAsyncThunk('user/getUserByUserId', async (userId: String) => {
	try {
		const userCollection = collection(db, 'users');
		const userSnapshot = await getDocs(userCollection);
		const user = userSnapshot.docs
			.map((doc) => doc.data() as UserProps)
			.filter((user) => user.userId === userId);

		return user
	} catch (error) {
		// Handle errors
		console.error('User not found', error);
	}
});

// reset password
export const PasswordResetEmail = createAsyncThunk(
	'auth/sendPasswordResetEmail',
	async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email).then((a) => {
				return { result: 'Password reset email sent' };
			});
		} catch (error) {
			throw error;
		}
	}
);

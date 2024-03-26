import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	getDocs,
	doc,
	collection,
	getDoc,
	setDoc,
	addDoc,
	deleteDoc,
	where,
	query,
} from 'firebase/firestore'; // Import your Firebase configuration
import { db } from '../../../firebase';
import { delete_images } from '../../../modules/apps/products/utils';

// Fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	try {
		const productsCollection = collection(db, `products`);
		const products = await getDocs(productsCollection);
		let productsData: { id: string }[] = [];
		for (const product of products.docs) {
			const groupId = product.data()!.group;
			let group = {};
			if (groupId && groupId !== '') {
				const groupRef = doc(db, `groups/${groupId}`);
				const groupDoc = await getDoc(groupRef);
				group = { groupData: groupDoc.data() };
			}
			const quantity = {
				total_quantity:
					product.data()!.sizes.length > 0
						? product.data()!.sizes.reduce((acc: any, curr: any) => acc + curr.quantity, 0)
						: product.data()!.stock
			};
			const descriptionExcerpt = product.data()!.description.substring(0, 20) + '...';

			productsData.push({
				id: product.id,
				...product.data(),
				...group,
				...quantity,
				...{ descriptionExcerpt: descriptionExcerpt }
			});
		}
		return productsData;
	} catch (error) {
		return error;
	}
});

// Add product
export const addProduct = createAsyncThunk('products/addProduct', async (product: any) => {
	try {
		const productsCollection = collection(db, `products`);
		await addDoc(productsCollection, product);
		return true;
	} catch (error) {
		console.error(error);
		return error;
	}
});

// Promote product
export const promoteProduct = createAsyncThunk(
	'products/promoteProduct',
	async (productId: any) => {
		try {
			const productRef = doc(db, `products/${productId}`);
			const productSnap = await getDoc(productRef);
			const product = productSnap.data();

			const newPromotionStatus = !product?.promoted;

			await setDoc(productRef, { promoted: newPromotionStatus }, { merge: true });

			return true;
		} catch (error) {
			return error;
		}
	}
);

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (productId: string) => {
	try {
		const productRef = doc(db, `products/${productId}`);
		const productSnap = await getDoc(productRef);
		const groupRef = doc(db, `groups/${productId}`);
		const groupDoc = await getDoc(groupRef);
		const group = { groupData: groupDoc.data() };

		return { ...productSnap.data(), ...group };
	} catch (error) {
		return error;
	}
});

// update Product
export const updateProduct = createAsyncThunk('products/updateProduct', async (product: any) => {
	try {
		const productRef = doc(db, `products`, product.product_id);
		await setDoc(productRef, product, { merge: true });
		return true;
	} catch (error) {
		console.log(error);
		return error;
	}
});

// delete Product
export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (productId: string) => {
		try {
			const productRef = doc(db, `products/${productId}`);
			// delete all images of this product from the bucket
			const productSnap = await getDoc(productRef);
			const product = productSnap.data();
			const images = product?.images;
			await delete_images(images);
			await deleteDoc(productRef);
			return true;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
);

// get product by group
export const fetchProductsByGroup = createAsyncThunk(
	'products/fetchProductsByGroup',
	async (groupId: string) => {
		try {
			const productsCollection = query(collection(db, `products`), where('group', '==', groupId));
			// get group info
			const groupRef = doc(db, `groups/${groupId}`);
			const groupDoc = await getDoc(groupRef);
			const group = { groupData: groupDoc.data() };
			const products = await getDocs(productsCollection);
			let productsData: { id: string }[] = [];
			for (const product of products.docs) {
				productsData.push({ id: product.id, ...product.data(), ...group });
			}
			return productsData;
		} catch (error) {
			return error;
		}
	}
);

// get remove group from product
export const removeGroupFromProduct = createAsyncThunk(
	'products/removeGroupFromProduct',
	async (productId: string) => {
		try {
			const productRef = doc(db, `products/${productId}`);
			await setDoc(productRef, { group: '' }, { merge: true });
			return true;
		} catch (error) {
			return error;
		}
	}
);

// get promoted products
export const fetchPromotedProducts = createAsyncThunk(
	'products/fetchPromotedProducts',
	async () => {
		try {
			const productsCollection = collection(db, `products`);
			const products = await getDocs(productsCollection);
			let productsData: { id: string }[] = [];
			for (const product of products.docs) {
				const groupId = product.data()!.group;
				let group = {};
				if (groupId && groupId !== '') {
					const groupRef = doc(db, `groups/${groupId}`);
					const groupDoc = await getDoc(groupRef);
					group = { groupData: groupDoc.data() };
				}
				const descriptionExcerpt = product.data()!.description.substring(0, 20) + '...';
				if (product.data()!.promoted) {
					productsData.push({
						id: product.id,
						...product.data(),
						...group,
						...{ descriptionExcerpt: descriptionExcerpt }
					});
				}
			}
			return productsData;
		} catch (error) {
			return error;
		}
	}
);
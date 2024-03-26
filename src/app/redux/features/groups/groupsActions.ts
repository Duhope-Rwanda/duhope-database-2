import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	doc,
	collection,
	addDoc,
	deleteDoc,
	onSnapshot,
	updateDoc,
	getDoc,
  writeBatch,
  arrayUnion,
  setDoc,
  arrayRemove 
} from 'firebase/firestore'; // Import your Firebase configuration
import { db } from '../../../firebase';
import { delete_images } from '../../../modules/apps/products/utils';
import { setLoading, setGroups, setGroupsProducts } from './groupsSlice'
// edit group
type Params = {
	data: any;
	id: string;
};
// get groups
export const fetchGroups = createAsyncThunk(
	'groups/fetchGroups',
	 async (_, { dispatch }) => {
	try {
		dispatch(setLoading(true));
		const groupsCollection = collection(db, 'groups');
		const unsubscribe = onSnapshot(groupsCollection, (snapshot) => {
			const groupsData: any = snapshot.docs.map((doc: any) => ({
			  id: doc.id, // Add the document ID to each product object
			  ...doc.data(),
			}));
			// Dispatch an action to update the products in Redux store
			dispatch(setGroups(groupsData));
			dispatch(setLoading(false));
		  });
				// Return the unsubscribe function to clean up the listener when needed
		  return unsubscribe;
	} catch (error) {
		console.error('Error fetching groups:', error);
		throw error;
	}
});

export const editGroup = createAsyncThunk(
	'groups/editGroup',
	async ({ data, id }: Params) => {
		try {
			const groupRef = doc(db, 'groups', id);
			await updateDoc(groupRef, data);
			return true;
		} catch (error) {
			return error;
		}
	}
);

//  delete group
export const deleteGroup = createAsyncThunk(
	'groups/deleteGroup',
	async (category_id: string) => {
		try {
			const group_ref = doc(db, 'groups', category_id);
			const group_snap = await getDoc(group_ref);
			const image = group_snap.data()?.image;
			await Promise.all([delete_images(image), deleteDoc(group_ref)]);
		} catch (error) {
			return error;
		}
	}
);

// add group
export const addGroup = createAsyncThunk('groups/addGroup', async (group: any) => {
	try {
		const groupsCollection = collection(db, `groups`);
		await addDoc(groupsCollection, group);
		return true;
	} catch (error) {
		return error;
	}
});

// add products to groups


export const addProductsToGroup = createAsyncThunk('groups/addProductsToGroup', async (group: any) => {
  try {
    const { groupId, products } = group;
    const groupDocRef = doc(db, 'groups', groupId);
    const groupSnapshot = await getDoc(groupDocRef);

    if (groupSnapshot.exists()) {
      const existingProducts = groupSnapshot.data().products || [];

      // Create a batch for multiple operations
      const batch = writeBatch(db);

      for (const newProduct of products) {
        // Check if the product already exists in the group
        const isProductInGroup = existingProducts.some((product) => product.value === newProduct.value);

        if (!isProductInGroup) {
          const productRef = doc(db, 'products', newProduct.value);

          try {
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              // If the product already exists, update the product in the products table
              await updateDoc(productRef, { groupId: arrayUnion(groupId), ...newProduct });
            } else {
              // If the product is new, add the product to the products table
              await setDoc(productRef, { groupId: arrayUnion(groupId), ...newProduct });
            }

            // Add the product to the existing products array
            batch.update(groupDocRef, { products: [...existingProducts, newProduct] });
          } catch (error) {
            console.error("Error updating or adding product:", error);
          }
        }
      }

      // Commit all the batch operations
      await batch.commit();

      return true;
    } else {
      throw new Error('Group not found');
    }
  } catch (error) {
    return error;
  }
});


export const removeProductFromGroup = createAsyncThunk(
  'groups/removeProductFromGroup',
  async ({ groupId, productId }: { groupId: string, productId: string }) => {
    try {
      const groupDocRef = doc(db, 'groups', groupId);
      const groupSnapshot = await getDoc(groupDocRef);

      if (groupSnapshot.exists()) {
        const existingProducts = groupSnapshot.data().products || [];
        const updatedProducts = existingProducts.filter((product) => product.value !== productId);

        // Remove the groupId from the products table
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, { groupId: arrayRemove(groupId) });

        // Update the group document without the removed product
        await updateDoc(groupDocRef, { products: updatedProducts });

        return true;
      } else {
        throw new Error('Group not found');
      }
    } catch (error) {
      return error;
    }
  }
);


export const getProductsInGroup = createAsyncThunk(
  'groups/getProductsInGroup',
  async (groupId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const groupDocRef = doc(db, 'groups', groupId);

      // Use onSnapshot to listen for real-time updates in the products array
      const unsubscribe = onSnapshot(groupDocRef, (doc) => {
        if (doc.exists()) {
          const products = doc.data().products || [];
          dispatch(setGroupsProducts(products));
          dispatch(setLoading(false));
        } else {
          throw new Error('Group not found');
        }
      });

      // Return the unsubscribe function to clean up the listener when needed
      return unsubscribe;
    } catch (error) {
      return error;
    }
  }
);
import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { ProductDeleteModalForm } from './ProductDeleteModalForm';

const ProductDeleteModalFormWrapper = () => {
	const { itemIdForUpdate } = useListView();

	if (itemIdForUpdate) {
		return <ProductDeleteModalForm />;
	}

	return null;
};

export { ProductDeleteModalFormWrapper };

import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { CategoryDeleteModalForm } from './category-delete-modal-form';

const CategoryDeleteModalFormWrapper = () => {
	const { item_for_delete } = useListView();

	if (item_for_delete) {
		return <CategoryDeleteModalForm />;
	}

	return null;
};

export { CategoryDeleteModalFormWrapper };

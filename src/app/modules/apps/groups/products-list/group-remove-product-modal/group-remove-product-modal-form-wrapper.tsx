import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { GroupProductRemoveModalForm } from './group-remove-product-modal-form';

const GroupProductRemoveModalFormWrapper = () => {
	const { itemToRemove } = useListView();

	if (itemToRemove) {
		return <GroupProductRemoveModalForm />;
	}

	return null;
};

export { GroupProductRemoveModalFormWrapper };

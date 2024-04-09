import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { GroupDeleteModalForm } from './group-delete-modal-form';

const GroupDeleteModalFormWrapper = () => {
	const { item_for_delete } = useListView();

	if (item_for_delete) {
		return <GroupDeleteModalForm />;
	}

	return null;
};

export { GroupDeleteModalFormWrapper };

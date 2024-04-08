import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { WomenDeleteModalForm } from './WomenDeleteModalForm';

const WomenDeleteModalFormWrapper = () => {
  const { itemIdForUpdate } = useListView();

  if (itemIdForUpdate) {
    return <WomenDeleteModalForm />;
  }

  return null;
};

export { WomenDeleteModalFormWrapper };

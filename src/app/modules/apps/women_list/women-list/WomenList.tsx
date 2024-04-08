import React from 'react';
import { KTCard } from '../../../../../_duhope/helpers';
import { WomenListHeader } from './components/header/WomenListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { WomenDeleteModal } from './women-delete-modal/WomenDeleteModal';
import { WomenTable } from './table/WomenTable';

const UsersList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        <WomenListHeader />
        <WomenTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <WomenDeleteModal />}
    </>
  );
};

const WomenListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { WomenListWrapper };

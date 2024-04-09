import { KTCard } from '../../../../_duhope/helpers';
import { CohortsListHeader } from './components/header/CohortsListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { CohortsTable } from './table/cohortsTable';
import { CohortAddModal } from './cohort-add-modal/CohortAddModal';
import { GroupDeleteModal } from './cohort-delete-modal/group-delete-modal';

const CohortsList = () => {
  const { itemIdForUpdate, item_for_delete } = useListView();
  return (
    <>
      <KTCard>
        <CohortsListHeader />
        <CohortsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <CohortAddModal />}
      {item_for_delete !== undefined && <GroupDeleteModal />}
    </>
  );
};

const CohortsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CohortsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { CohortsListWrapper };
import { KTCard } from '../../../../../_duhope/helpers';
import { GroupsListHeader } from './components/header/GroupsListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { GroupsTable } from './table/groupsTable';
import { GroupEditModal } from './group-edit-modal/GroupEditModal';
import { GroupDeleteModal } from './group-delete-modal/group-delete-modal';

const GroupsList = () => {
  const { itemIdForUpdate, item_for_delete } = useListView();
  return (
    <>
      <KTCard>
        <GroupsListHeader />
        <GroupsTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <GroupEditModal />}
      {item_for_delete !== undefined && <GroupDeleteModal />}
    </>
  );
};

const GroupsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <GroupsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { GroupsListWrapper };

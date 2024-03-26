import { KTCard } from '../../../../../_powr/helpers';
import { CategoriesListHeader } from './components/header/CategoriesListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { CategoriesTable } from './table/categoriesTable';
import { CategoryEditModal } from './category-edit-modal/CategoryEditModal';
import { CategoryDeleteModal } from './category-delete-modal/category-delete-modal';

const UsersList = () => {
	const { itemIdForUpdate, item_for_delete } = useListView();
	return (
		<>
			<KTCard>
				<CategoriesListHeader />
				<CategoriesTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <CategoryEditModal />}
			{item_for_delete !== undefined && <CategoryDeleteModal />}
		</>
	);
};

const UsersListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<UsersList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { UsersListWrapper };

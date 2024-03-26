import React from 'react';
import { KTCard } from '../../../../../_powr/helpers';
import { ProductsListHeader } from './components/header/ProductsListHeader';
import { ListViewProvider, useListView } from './core/ListViewProvider';
import { QueryRequestProvider } from './core/QueryRequestProvider';
import { QueryResponseProvider } from './core/QueryResponseProvider';
import { ProductDeleteModal } from './product-delete-modal/ProductDeleteModal';
import { ProductsTable } from './table/ProductsTable';

const UsersList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<ProductsListHeader />
				<ProductsTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <ProductDeleteModal />}
		</>
	);
};

const ProductsListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<UsersList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { ProductsListWrapper };

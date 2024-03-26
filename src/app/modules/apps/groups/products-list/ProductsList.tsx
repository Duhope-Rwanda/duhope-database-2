import { KTCard } from '../../../../../_powr/helpers'
import { UsersListHeader } from './components/header/UsersListHeader'
import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UserEditModal } from './product-edit-modal/ProductEditModal'
import { ProductsTable } from './table/ProductsTable'
import { GroupAddProductsModal } from './group-add-product-modal/GroupAddProductModal'
import { GroupProductRemoveModal } from './group-remove-product-modal/group-remove-product-modal'
const UsersList = () => {
  const { itemIdForUpdate, itemIdForAddProduct, itemToRemove } = useListView()
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <ProductsTable />
      </KTCard>
      {itemToRemove !== undefined && <GroupProductRemoveModal />}
      {itemIdForUpdate !== undefined && <UserEditModal />}
      {itemIdForAddProduct !== undefined && <GroupAddProductsModal />}
    </>
  )
}

const ProductsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { ProductsListWrapper }
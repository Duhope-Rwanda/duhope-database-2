import { KTIcon } from '../../../../../../../_duhope/helpers'
import { useListView } from '../../core/ListViewProvider'

const UsersListToolbar = () => {
  const { setItemIdForAddProduct } = useListView()
  const openAddUserModal = () => {
    setItemIdForAddProduct(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <div onClick={openAddUserModal} className=''>
        <button type='button' className='btn btn-primary' >
          <KTIcon iconName='plus' className='fs-2' />
          Add Product
        </button>
      </div>
    </div>
  )
}

export { UsersListToolbar }
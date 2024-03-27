import { Link } from 'react-router-dom'
import { KTIcon } from '../../../../../../../_duhope/helpers'
import { useListView } from '../../core/ListViewProvider'
import { ProductsListFilter } from './ProductsListFilter'

const ProductsListToolbar = () => {
  const { setItemIdForUpdate } = useListView()
  const openAddUserModal = () => {
    setItemIdForUpdate(null)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <ProductsListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <Link to={`/apps/products/add/`} className=''>
        <button type='button' className='btn btn-primary' >
          <KTIcon iconName='plus' className='fs-2' />
          Add Product
        </button>
      </Link>
      {/* end::Add user */}
    </div>
  )
}

export { ProductsListToolbar }
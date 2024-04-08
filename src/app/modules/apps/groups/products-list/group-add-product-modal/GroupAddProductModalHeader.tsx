import { KTIcon } from '../../../../../../_duhope/helpers'
import { useListView } from '../core/ListViewProvider';

const GroupAddProductModalHeader = () => {
  const { setItemIdForAddProduct, itemIdForAddProduct } = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{itemIdForAddProduct ? 'Add products to group' : 'Add products to group'}</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForAddProduct(undefined)}
        style={{ cursor: 'pointer' }}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export { GroupAddProductModalHeader }


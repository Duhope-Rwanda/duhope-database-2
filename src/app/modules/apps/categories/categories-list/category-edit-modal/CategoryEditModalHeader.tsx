import { KTIcon } from '../../../../../../_powr/helpers'
import { useListView } from '../core/ListViewProvider'

const CategoryEditModalHeader = () => {
  const {setItemIdForUpdate,itemIdForUpdate} = useListView()

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder'>{itemIdForUpdate?'Category Details':'Add a Category'}</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export { CategoryEditModalHeader }


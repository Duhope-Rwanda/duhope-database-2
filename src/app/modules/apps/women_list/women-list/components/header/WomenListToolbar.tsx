import { Link } from 'react-router-dom'
import { KTIcon } from '../../../../../../../_duhope/helpers'

const WomenListToolbar = () => {
  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export */}
      {/* </button> */}
      <Link to={`/apps/women/add`} className=''>
        <button type='button' className='btn btn-primary' >
          <KTIcon iconName='plus' className='fs-2' />
          Add Woman
        </button>
      </Link>
    </div>
  )
}

export { WomenListToolbar }


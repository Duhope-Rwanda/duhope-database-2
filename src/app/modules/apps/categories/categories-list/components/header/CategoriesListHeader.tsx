import {useListView} from '../../core/ListViewProvider'
import {CategoriesListToolbar} from './CategoryListToolbar'
import {UsersListGrouping} from './UsersListGrouping'

const CategoriesListHeader = () => {
  const {selected} = useListView()

  return (
    <div className='card-header border-0 pt-6'>
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <CategoriesListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {CategoriesListHeader}

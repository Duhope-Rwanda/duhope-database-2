import { useListView } from '../../core/ListViewProvider'
import { GroupsListToolbar } from './CategoryListToolbar'
import { UsersListGrouping } from './UsersListGrouping'

const GroupsListHeader = () => {
  const { selected } = useListView()

  return (
    <div className='card-header border-0 pt-6'>
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <GroupsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { GroupsListHeader }

import { useListView } from '../../core/ListViewProvider'
import { CohortListToolbar } from './CohortListToolbar'
import { CohortsListGrouping } from './CohortsListGrouping'

const CohortsListHeader = () => {
  const { selected } = useListView()

  return (
    <div className='card-header border-0 pt-6'>
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <CohortsListGrouping /> : <CohortListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { CohortsListHeader }

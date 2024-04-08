import { useListView } from '../../core/ListViewProvider'
import { WomenListToolbar } from './WomenListToolbar'
import { WomenListGrouping } from './WomenListGrouping'

const WomenListHeader = () => {
  const { selected } = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <div className='card-toolbar'>
        {selected.length > 0 ? <WomenListGrouping /> : <WomenListToolbar />}
      </div>
    </div>
  )
}

export { WomenListHeader }

import { useListView } from '../../core/ListViewProvider'
import { ProductsListToolbar } from './ProductListToolbar'
import { ProductsListGrouping } from './ProductsListGrouping'

const ProductsListHeader = () => {
  const { selected } = useListView()
  return (
    <div className='card-header border-0 pt-6'>

      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ProductsListGrouping /> : <ProductsListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { ProductsListHeader }

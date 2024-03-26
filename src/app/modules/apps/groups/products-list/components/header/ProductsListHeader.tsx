import { useListView } from '../../core/ListViewProvider'
import { ProductsListToolbar } from './ProductsListToolbar'
import { ProductsListGrouping } from './ProductsListGrouping'
import { ProductsListSearchComponent } from './ProductsListSearchComponent'

const ProductsListHeader = ({ handleSearch }) => {
  const { selected } = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ProductsListSearchComponent handleSearch={handleSearch} />
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

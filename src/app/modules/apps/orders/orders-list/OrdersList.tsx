import { KTCard } from '../../../../../_powr/helpers'
import { ListViewProvider } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { OrdersTable } from './table/OrdersTable'

const ProductsList = () => {
  return (
    <>
      <KTCard>
        <OrdersTable />
      </KTCard>
    </>
  )
}

const ProductsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <ProductsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { ProductsListWrapper }


import { useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import { UsersListPagination } from '../../../../app/modules/apps/products/products-list/components/pagination/UsersListPagination'
import { CustomHeaderColumn } from '../../../../app/modules/apps/orders/orders-list/table/columns/CustomHeaderColumn'
import { CustomRow } from '../../../../app/modules/apps/orders/orders-list/table/columns/CustomRow'
import { productsColumns } from '../../../../app/modules/apps/products/products-list/table/columns/dashColumnTable'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { ProcessingLoader } from '../../../../app/components/loaders/processingLoader'

const TablesWidget5 = ({ className }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { loading, products } = useSelector((state: any) => state.products);
  const { orders } = useSelector((state: any) => state.orders);

  useEffect(() => {
    if (orders && orders.length > 0) {
      // Sort orders by date to get the latest orders
      const sortedOrders = orders.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      // Select top 3 orders
      const top3Orders = sortedOrders.slice(0, 3);
      // Extract products from top 3 orders
      let latestProducts = [];
      top3Orders.forEach(order => {
        if (order.products) {
          latestProducts = latestProducts.concat(order.products);
        }
      });
      // Update the latestProducts state
      setLatestProducts(latestProducts);
    }
  }, [orders]);

  // Set the data for the table using latestProducts
  const data = useMemo(() => (latestProducts.length > 0 ? latestProducts : products), [latestProducts, products]);
  const isLoading = useMemo(() => loading, [loading]);
  const columns = useMemo(() => productsColumns, []);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div className={`card ${className} px-12 py-5`}>
      <h3 className='card-title fw-bold text-dark mb-6'>Latest Products</h3>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column, i) => (
                <CustomHeaderColumn key={i} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UsersListPagination />
      {isLoading && <ProcessingLoader />}
    </div>
  );
}
export { TablesWidget5 };





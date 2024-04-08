import { useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ColumnInstance, Row, useTable } from 'react-table'
import { KTCardBody } from '../../../../../../_duhope/helpers'
import { UsersListPagination } from '../components/pagination/UsersListPagination'
import { Order } from '../core/_models'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import { orderColumns } from './columns/_columns'
import { fetchOrders } from '../../../../../redux/features/orders/orderActions';
import { useState } from 'react';
import { UsersListSearchComponent } from '../components/header/UsersListSearchComponent';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader';

const OrdersTable = () => {
  const dispatch = useDispatch();
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { loading, orders } = useSelector(
    (state: any) => state.orders
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchOrders() as any)
    };
    fetchData();
  }, [dispatch]);


  const handleSearch = (searchTerm) => {
    const filtered = orders.filter((order) =>
      order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const data = useMemo(() => (filteredOrders.length > 0 ? filteredOrders : orders), [
    orders,
    filteredOrders,
  ]);
  const columns = useMemo(() => orderColumns, [])
  const { getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })
  return (
    <KTCardBody className='py-4'>
      <UsersListSearchComponent handleSearch={handleSearch} />
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        // {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<Order>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<Order>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
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
      {loading && <ProcessingLoader />}
    </KTCardBody>
  )
}

export { OrdersTable }
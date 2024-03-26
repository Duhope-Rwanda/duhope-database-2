import { useEffect, useMemo } from 'react';
import { ColumnInstance, Row, useTable } from 'react-table';
import { KTCardBody } from '../../../../../../_powr/helpers';
import { UsersListPagination } from '../components/pagination/UsersListPagination';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { fetch_products } from '../../../../../redux/products/actions';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import type { TProduct } from '../../../../../redux/products/types';
import { ProductsListSearchComponent } from "../components/header/ProductsListSearchComponent"
import { useState } from 'react';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.productsV2);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered: any = products.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    dispatch(fetch_products());
  }, [dispatch]);

  const columns = useMemo(() => usersColumns, []);
  const data = useMemo(
    () => (filteredProducts.length > 0 ? filteredProducts : products),
    [filteredProducts, products]
  );
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data
  });
  return (
    <KTCardBody className="py-4">
      <ProductsListSearchComponent handleSearch={handleSearch} />
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance<TProduct>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<TProduct>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
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
  );
};

export { ProductsTable };

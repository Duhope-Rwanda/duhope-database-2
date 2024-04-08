import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { KTCardBody } from '../../../../../../_duhope/helpers';
import { UsersListPagination } from '../components/pagination/UsersListPagination';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { ProductsListSearchComponent } from "../components/header/ProductsListSearchComponent"
import { useState } from 'react';
import { getProductsInGroup } from '../../../../../redux/features/groups/groupsActions';
import { useParams } from 'react-router-dom';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader';

const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const { groupsProducts, loadingGroups } = useAppSelector((state) => state.groups);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { groupId } = useParams();

  const handleSearch: (searchTerm: any) => void = (searchTerm) => {
    const filtered: any = groupsProducts.filter((product: any) =>
      product.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (!groupId) {
      return
    }
    dispatch(getProductsInGroup(groupId));
  }, [groupId, dispatch])

  const columns = useMemo(() => usersColumns, []);
  const data = useMemo(
    () => (filteredProducts.length > 0 ? filteredProducts : groupsProducts),
    [filteredProducts, groupsProducts]
  );
  console.log(">>>>>prods", groupsProducts)
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
              {headers.map((column: any) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: any, i) => {
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
      {loadingGroups && <ProcessingLoader />}
    </KTCardBody>
  );
};

export { ProductsTable };
import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { KTCardBody } from '../../../../../../_duhope/helpers';
import { UsersListPagination } from '../components/pagination/UsersListPagination';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { womenColumns } from './columns/_columns';
import { fetchWomen } from '../../../../../redux/features/women/womenActions';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { WomenListSearchComponent } from "../components/header/WomenListSearchComponent"
import { useState } from 'react';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

const WomenTable = () => {
  const dispatch = useAppDispatch();
  const { women, loadingWomen } = useAppSelector((state) => state.women);
  const [filteredWomen, setFilteredWomen] = useState([]);

  const handleSearch = (searchTerm) => {
    const filtered: any = women.filter((woman: any) =>
      woman.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || woman.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWomen(filtered);
  };

  useEffect(() => {
    dispatch(fetchWomen());
  }, [dispatch]);

  const columns = useMemo(() => womenColumns, []);
  const data = useMemo(
    () => (filteredWomen.length > 0 ? filteredWomen : women),
    [filteredWomen, women]
  );
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data
  });
  return (
    <KTCardBody className="py-4">
      <WomenListSearchComponent handleSearch={handleSearch} />
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
      {loadingWomen && <ProcessingLoader />}
    </KTCardBody>
  );
};

export { WomenTable };

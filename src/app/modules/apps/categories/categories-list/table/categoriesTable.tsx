import { useEffect, useMemo } from 'react'
import { ColumnInstance, Row, useTable } from 'react-table'
import { KTCardBody } from '../../../../../../_duhope/helpers'
import { UsersListPagination } from '../components/pagination/UsersListPagination'
import { User } from '../core/_models'
import { CustomHeaderColumn } from './columns/CustomHeaderColumn'
import { CustomRow } from './columns/CustomRow'
import { usersColumns } from './columns/_columns'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../../../../redux/features/categories/categoriesActions'
import { useState } from 'react';
import { UsersListSearchComponent } from '../components/header/UsersListSearchComponent'
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

const CategoriesTable = () => {
  const dispatch = useDispatch()
  const [filteredCategories, setFilteredCategories] = useState([]);


  const { loadingCategories, categories } = useSelector(
    (state: any) => state.categories
  )

  const handleSearch = (searchTerm) => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [dispatch])

  const data = useMemo(() => (filteredCategories.length > 0 ? filteredCategories : categories), [
    categories,
    filteredCategories,
  ]);
  const columns = useMemo(() => usersColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
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
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
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
      {loadingCategories && <ProcessingLoader />}
    </KTCardBody>
  )
}

export { CategoriesTable }


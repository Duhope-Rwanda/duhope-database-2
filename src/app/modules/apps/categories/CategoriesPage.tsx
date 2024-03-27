import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_duhope/layout/core'
import { UsersListWrapper } from './categories-list/CategoriesList'
const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Categories Management',
    path: '/apps/categories/categories',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CategoriesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='categories'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Categories List</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/categories/categories' />} />
    </Routes>
  )
}

export default CategoriesPage

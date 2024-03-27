import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_duhope/layout/core'
import { GroupsListWrapper } from './groups-list/GroupsList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Groups Management',
    path: '/apps/groups/groups',
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

const GroupsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='groups'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Groups List</PageTitle>
              <GroupsListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/groups/groups' />} />
    </Routes>
  )
}

export default GroupsPage
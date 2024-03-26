import { useListView } from '../core/ListViewProvider'
import { GroupEditModalForm } from './GroupEditModalForm'
import { useSelector } from 'react-redux'


const GroupEditModalFormWrapper = () => {
  const { itemIdForUpdate } = useListView()
  const { loadingGroups, groups } = useSelector((state: any) => state.groups)

  // const {
  //   isLoading,
  //   data: user,
  //   error,

  // } = useQuery(
  //   `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
  //   () => {
  //     return getUserById(itemIdForUpdate)
  //   },
  //   {
  //     cacheTime: 0,
  //     enabled: enabledQuery,
  //     onError: (err) => {
  //       setItemIdForUpdate(undefined)
  //       console.error(err)
  //     },
  //   }
  // )

  if (!itemIdForUpdate) {
    return <GroupEditModalForm isUserLoading={loadingGroups} group={groups.filter((e) => e.id === itemIdForUpdate)[0]} />
  } else {
    return <GroupEditModalForm isUserLoading={loadingGroups} group={groups.filter((e) => e.id === itemIdForUpdate)[0]} />
  }

}

export { GroupEditModalFormWrapper }


import { useListView } from '../../groups-list/core/ListViewProvider'
import { GroupAddProductsModalForm } from './GroupAddProductModalForm'
import { useSelector } from 'react-redux'


const GroupAddProductsModalFormWrapper = () => {
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
    return <GroupAddProductsModalForm isUserLoading={loadingGroups} group={groups.filter((e) => e.id === itemIdForUpdate)[0]} />
  } else {
    return <GroupAddProductsModalForm isUserLoading={loadingGroups} group={groups.filter((e) => e.id === itemIdForUpdate)[0]} />
  }

}

export { GroupAddProductsModalFormWrapper }


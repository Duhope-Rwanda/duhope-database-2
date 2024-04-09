import { useListView } from '../core/ListViewProvider'
import { CohortAddModalForm } from './CohortAddModalForm'
import { useSelector } from 'react-redux'


const CohortAddModalFormWrapper = () => {
  const { itemIdForUpdate } = useListView()
  const { loadingCohorts, cohorts } = useSelector((state: any) => state.cohort)

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
    return <CohortAddModalForm isUserLoading={loadingCohorts} cohort={cohorts.filter((e) => e.id === itemIdForUpdate)[0]} />
  } else {
    return <CohortAddModalForm isUserLoading={loadingCohorts} cohort={cohorts.filter((e) => e.id === itemIdForUpdate)[0]} />
  }

}

export { CohortAddModalFormWrapper }


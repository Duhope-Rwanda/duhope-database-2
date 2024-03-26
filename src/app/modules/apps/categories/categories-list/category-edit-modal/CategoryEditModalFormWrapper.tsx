import { useListView } from '../core/ListViewProvider'
import { CategoryEditModalForm } from './CategoryEditModalForm'
import { useSelector } from 'react-redux'


const CategoryEditModalFormWrapper = () => {
  const { itemIdForUpdate } = useListView()
  const { loadingCategories, categories } = useSelector((state: any) => state.categories)

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
    return <CategoryEditModalForm isUserLoading={loadingCategories} category={categories.filter((e) => e.id === itemIdForUpdate)[0]} />
  } else {
    return <CategoryEditModalForm isUserLoading={loadingCategories} category={categories.filter((e) => e.id === itemIdForUpdate)[0]} />
  }

}

export { CategoryEditModalFormWrapper }


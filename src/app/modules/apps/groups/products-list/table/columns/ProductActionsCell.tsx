/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { MenuComponent } from '../../../../../../../_powr/assets/ts/components'
import { ID } from '../../../../../../../_powr/helpers'
import { useListView } from '../../core/ListViewProvider'

type Props = {
  id: ID
}

const ProductActionsCell: FC<Props> = ({ id }) => {
  const { setItemToRemove } = useListView()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  function openDeleteModal() {
    setItemToRemove(id);
  }

  return (
    <>
      <div className='btn btn-light btn-active-light-primary btn-sm'>
        <a
          className=''
          // data-kt-users-table-filter='delete_row'
          onClick={async () => await openDeleteModal()}
        >
          Remove
        </a>
      </div>
    </>
  )
}

export { ProductActionsCell }
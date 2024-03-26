/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react';
import { MenuComponent } from '../../../../../../../_powr/assets/ts/components';
import { ID, KTIcon } from '../../../../../../../_powr/helpers';
import { useListView } from '../../core/ListViewProvider';
import { Link } from 'react-router-dom'

type Props = {
  id: ID;
};

const GroupActionsCell: FC<Props> = ({ id }) => {
  const { setItemIdForUpdate, set_item_for_delete } = useListView();

  useEffect(() => {
    MenuComponent.reinitialization();
  }, []);

  const openEditModal = () => {
    setItemIdForUpdate(id);
  };

  function openDeleteModal() {
    set_item_for_delete(id);
  }

  return (
    <>
      <a
        href="#"
        className="btn btn-light btn-active-light-primary btn-sm"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        Actions
        <KTIcon iconName="down" className="fs-5 m-0" />
      </a>
      {/* begin::Menu */}
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
        data-kt-menu="true"
      >
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a className="menu-link px-3" onClick={openEditModal}>
            View
          </a>
        </div>
        {/* end::Menu item */}
        <div className='menu-item px-3'>
          <Link className='menu-link px-3' to={`/apps/groups/${id}/products`}>
            Products
          </Link>
        </div>
        {/* begin::Menu item */}
        <div className="menu-item px-3">
          <a
            className="menu-link px-3"
            data-kt-users-table-filter="delete_row"
            onClick={openDeleteModal}
          >
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  );
};

export { GroupActionsCell };

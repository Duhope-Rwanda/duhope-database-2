import { KTIcon } from '../../../../../../_duhope/helpers';
import { useListView } from '../core/ListViewProvider';

const GroupProductRemoveModalHeader = () => {
  const { set_item_for_delete } = useListView();

  return (
    <div className="modal-header">
      {/* begin::Modal title */}
      <h2 className="fw-bolder">Remove product from group</h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className="btn btn-icon btn-sm btn-active-icon-primary"
        data-kt-users-modal-action="close"
        onClick={() => set_item_for_delete(undefined)}
        style={{ cursor: 'pointer' }}
      >
        <KTIcon iconName="cross" className="fs-1" />
      </div>
      {/* end::Close */}
    </div>
  );
};

export { GroupProductRemoveModalHeader };

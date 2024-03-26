import React, { useState } from 'react';
import { useListView } from '../core/ListViewProvider';
import { useDispatch } from 'react-redux';
import {
  deleteGroup,
  fetchGroups
} from '../../../../../redux/features/groups/groupsActions';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

const GroupDeleteModalForm = () => {
  const dispatch = useDispatch();
  const { item_for_delete, set_item_for_delete } = useListView();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancel = () => {
    set_item_for_delete(undefined);
  };

  function handledeleteGroup() {
    setIsSubmitting(true);
    try {
      dispatch(deleteGroup(item_for_delete as any) as any);
      dispatch(fetchGroups() as any);
      set_item_for_delete(undefined);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form id="kt_modal_add_user_form" className="form" noValidate>
        {/* begin::Scroll */}
        <p className="fw-bold text-center">Are you sure you want to delete this group?</p>
        {/* end::Scroll */}
        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={isSubmitting}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-danger"
            data-kt-users-modal-action="submit"
            disabled={isSubmitting}
            onClick={handledeleteGroup}
          >
            <span className="indicator-label">Delete</span>
            {isSubmitting && (
              <span className="indicator-progress">
                Please wait...{' '}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {isSubmitting && <ProcessingLoader />}
    </>
  );
};

export { GroupDeleteModalForm };

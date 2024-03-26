import React, { useState, useEffect } from 'react';
import { useListView } from '../core/ListViewProvider';
import { useDispatch } from 'react-redux';
import { removeProductFromGroup, fetchGroups } from '../../../../../redux/features/groups/groupsActions';
import { useParams } from 'react-router-dom';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader';

const GroupProductRemoveModalForm = () => {
  const dispatch = useDispatch();
  const { itemToRemove, setItemToRemove } = useListView();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("")
  const { groupId } = useParams();

  const cancel = () => {
    setItemToRemove(undefined);
  };

  useEffect(() => {
    if (!groupId) {
      return
    }
    setId(groupId)
  }, [groupId])

  function handleDeleteCategory() {
    setIsSubmitting(true);
    try {
      dispatch(removeProductFromGroup({
        groupId: id,
        productId: itemToRemove,
      } as any) as any);
      dispatch(fetchGroups() as any);
      setItemToRemove(undefined);
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
        <p className="fw-bold text-center">Are you sure you want to remove this product from this group?</p>
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
            onClick={handleDeleteCategory}
          >
            <span className="indicator-label">Remove</span>
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

export { GroupProductRemoveModalForm };

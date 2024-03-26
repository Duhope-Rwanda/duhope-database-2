import React, { useState } from 'react';
import { useListView } from '../core/ListViewProvider';
import { useDispatch } from 'react-redux';
import {
  deleteCategory,
  fetchCategories
} from '../../../../../redux/features/categories/categoriesActions';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

const CategoryDeleteModalForm = () => {
  const dispatch = useDispatch();
  const { item_for_delete, set_item_for_delete } = useListView();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cancel = () => {
    set_item_for_delete(undefined);
  };

  function handleDeleteCategory() {
    setIsSubmitting(true);
    try {
      dispatch(deleteCategory(item_for_delete as any) as any);
      dispatch(fetchCategories() as any);
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
        <p className="fw-bold text-center">Are you sure you want to delete this category?</p>
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

export { CategoryDeleteModalForm };

import React from 'react';
import { useListView } from '../core/ListViewProvider';
import { useAppDispatch } from '../../../../../redux/hooks';
import { delete_product, fetch_products } from '../../../../../redux/products/actions';

const ProductDeleteModalForm = () => {
  const dispatch = useAppDispatch();
  const { itemIdForUpdate, setItemIdForUpdate } = useListView();

  const cancel = () => {
    setItemIdForUpdate(undefined);
  };

  function handleDeleteProduct() {
    try {
      dispatch(delete_product(itemIdForUpdate as any));
      dispatch(fetch_products());
      setItemIdForUpdate(undefined);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <form id="kt_modal_add_user_form" className="form" noValidate>
        {/* begin::Scroll */}
        <p className="fw-bold text-center">Are you sure you want to delete this product?</p>
        {/* end::Scroll */}
        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-danger"
            data-kt-users-modal-action="submit"
            onClick={handleDeleteProduct}
          >
            <span className="indicator-label">Delete</span>
          </button>
        </div>
        {/* end::Actions */}
      </form>
    </>
  );
};

export { ProductDeleteModalForm };

import clsx from 'clsx';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { useListView } from '../core/ListViewProvider';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useDispatch } from 'react-redux';
import {
  addCategory,
  editCategory,
  fetchCategories
} from '../../../../../redux/features/categories/categoriesActions';
import { upload_images } from '../../../products/utils';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

type Props = {
  isUserLoading: boolean;
  category: any;
};

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required')
});

const CategoryEditModalForm: FC<Props> = ({ category, isUserLoading }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState<File>();
  const image = category?.image || ''

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const formik = useFormik({
    initialValues: {
      name: category?.name || ''
    },
    validationSchema: editUserSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const imageURL =
          img === undefined
            ? image
            : await upload_images({ files: [img], folder_name: 'categories' });

        const categoryData = {
          name: values.name,
          image: imageURL
        };

        if (!category) {
          dispatch(addCategory(categoryData) as any);
        } else {
          dispatch(
            editCategory({
              id: category.id,
              data: categoryData
            }) as any
          );
        }
        dispatch(fetchCategories() as any);
        cancel();
      } catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    }
  });

  return (
    <>
      <form id="kt_modal_add_user_form" className="form" onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          {' '}
        </div>

        <div className="fv-row mb-7">
          <label className="required fw-bold fs-6 mb-2">Category Name</label>

          <input
            placeholder="name"
            type="text"
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              { 'is-invalid': formik.touched.name && formik.errors.name },
              {
                'is-valid': formik.touched.name && !formik.errors.name
              }
            )}
            autoComplete="off"
            {...formik.getFieldProps('name')}
            disabled={formik.isSubmitting || isUserLoading}
          />
        </div>

        <div className="fv-row mb-7">
          <>
            <label className="required fw-bold fs-6 mb-2">Category Image</label>
            <div className="mb-3">
              <input
                type="file"
                onChange={handleImageUpload}
                className="form-control"
                id="imageUpload"
                disabled={formik.isSubmitting || isUserLoading}
              />
            </div>
          </>

          {category?.image && img === undefined && (
            <div className="mb-3 image-input image-input-outline">
              <img src={category?.image} alt="uploaded" style={{ width: '160px' }} />
            </div>
          )}
          {img && (
            <div className="mb-3">
              <img
                src={URL.createObjectURL(new Blob([img], { type: 'image/*' }))}
                alt="uploaded"
                style={{ width: '80px' }}
              />
            </div>
          )}
        </div>

        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{' '}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>

        {/* end::Actions */}
      </form>
      {(formik.isSubmitting) && <ProcessingLoader />}
    </>
  );
};

export { CategoryEditModalForm };

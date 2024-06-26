import clsx from 'clsx';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { useListView } from '../core/ListViewProvider';
import { useQueryResponse } from '../core/QueryResponseProvider';
import { useDispatch } from 'react-redux';
import {
  addGroup,
  editGroup,
  fetchGroups
} from '../../../../../redux/features/groups/groupsActions';
import { upload_images } from '../../../products/utils';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

type Props = {
  isUserLoading: boolean;
  group: any;
};

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required')
});

const GroupEditModalForm: FC<Props> = ({ group, isUserLoading }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState<File>();
  const image = group?.image || ''

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
      name: group?.name || ''
    },
    validationSchema: editUserSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const imageURL =
          img === undefined
            ? image
            : await upload_images({ files: [img], folder_name: 'groups' });

        const groupData = {
          name: values.name,
          image: imageURL
        };

        if (!group) {
          dispatch(addGroup(groupData) as any);
        } else {
          dispatch(
            editGroup({
              id: group.id,
              data: groupData
            }) as any
          );
        }
        dispatch(fetchGroups() as any);
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
          <label className="required fw-bold fs-6 mb-2">group Name</label>

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
            <label className="required fw-bold fs-6 mb-2">group Image</label>
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

          {group?.image && img === undefined && (
            <div className="mb-3 image-input image-input-outline">
              <img src={group?.image} alt="uploaded" style={{ width: '160px' }} />
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

export { GroupEditModalForm };
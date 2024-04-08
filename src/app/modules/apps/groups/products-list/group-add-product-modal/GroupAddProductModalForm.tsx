import { useFormik } from 'formik';
import { FC, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useListView } from '../core/ListViewProvider';
import { useQueryResponse } from '../../groups-list/core/QueryResponseProvider';
import { useParams } from 'react-router-dom';
import Select from "react-select"
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { fetch_products } from '../../../../../redux/products/actions';
import { addProductsToGroup } from '../../../../../redux/features/groups/groupsActions';
import { ProcessingLoader } from '../../../../../components/loaders/processingLoader'

type Props = {
  isUserLoading: boolean;
  group: any;
};

const editUserSchema = Yup.object().shape({
  id: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
});

const GroupAddProductsModalForm: FC<Props> = ({ group, isUserLoading }) => {
  const dispatch = useAppDispatch();
  const { groupId } = useParams();
  const { products, loading } = useAppSelector((state) => state.productsV2);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [id, setId] = useState<string>("")
  const { setItemIdForAddProduct } = useListView();
  const { refetch } = useQueryResponse();

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForAddProduct(undefined);
  };

  useEffect(() => {
    dispatch(fetch_products());
  }, [dispatch]);

  useEffect(() => {
    if (!groupId) {
      return
    }
    setId(groupId)
  }, [groupId])

  const formik = useFormik({
    initialValues: {
      name: group?.name || ''
    },
    validationSchema: editUserSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const groupData = {
          groupId: id,
          products: selectedOption
        };
        dispatch(addProductsToGroup(groupData) as any);
        cancel();
      }
      catch (ex) {
        console.error(ex);
      } finally {
        setSubmitting(true);
        cancel(true);
      }
    }
  });
  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} className='cursor-pointer mb-3 p-2 border-top'>
      {data.image && (
        <img src={data.image} alt="" height="30px" width="30px" style={{ marginRight: '8px' }} />
      )}
      <span className='text-black'>
        {label}
      </span>
    </div>
  );

  const options = products.map((products: any) => (
    {
      value: products.id,
      label: products.name,
      image: products.main_image_url,
      patternOrColor: products.patternOrColor?.image || "",
      price: products.price,
      stock: products.stock
    }));

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

        <div className="fv-row mb-7 relative">
          <label className="required fw-bold fs-6 mb-2">Choose Products</label>
          <div className='absolute z-10'>
            <Select
              isSearchable={true}
              isClearable={true}
              isMulti
              className=""
              isDisabled={formik.isSubmitting || loading}
              options={options}
              onChange={(selectedOption) => setSelectedOption(selectedOption)}
              components={{ Option: CustomOption }}
              placeholder="Choose a product"
            />
          </div>
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

export { GroupAddProductsModalForm };
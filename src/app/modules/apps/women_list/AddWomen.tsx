import clsx from 'clsx';
import { useFormik } from 'formik';
import React, {
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toAbsoluteUrl } from '../../../../_duhope/helpers';
import { PageTitle } from '../../../../_duhope/layout/core';
import { upload_images } from './utils';
import {
  useAppDispatch,
  useAppSelector
} from '../../../redux/hooks';
import {
  addWoman,
  fetchWomen
} from '../../../redux/features/women/womenActions';
import { fetchCategories } from '../../../redux/features/categories/categoriesActions';
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min";
import { ProcessingLoader } from '../../../components/loaders/processingLoader'

export const women_schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required(
    'Description is required'
  ),
  price: Yup.number().required(
    'Price is required'
  ),
  stock: Yup.number().required(
    'Stock is required'
  ),
  category_id: Yup.string().required(
    'Category is required'
  ),
  discount_type: Yup.string().required(
    'Discount Type is required'
  ),
  discount_number: Yup.number(),
  discount_percentage: Yup.number(),
  images: Yup.array()
    .of(Yup.string().url())
    .required('Images are required'),
  main_image_url: Yup.string().url(),
  featured: Yup.boolean().required(
    'Featured is required'
  ),
  points: Yup.number(),
  ratings: Yup.number(),
  // sizes for clothes
  size_XS: Yup.number(),
  size_S: Yup.number(),
  size_M: Yup.number(),
  size_L: Yup.number(),
  size_XL: Yup.number(),
  size_XXL: Yup.number(),
  // sizes for shoes based on the shoes_sizes_count
  shoe_sizes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(
        'Name is required'
      ),
      quantity: Yup.number().required(
        'Quantity is required'
      )
    })
  ),
  patternOrColor: Yup.object()
});

type WomenForm = Yup.InferType<
  typeof women_schema
>;

const initial_values: WomenForm = {
  name: '',
  description: '',
  category_id: '',
  price: 0,
  stock: 0,
  discount_type: 'percentage',
  discount_number: 0,
  discount_percentage: 0,
  images: [],
  main_image_url: '',
  featured: false,
  points: 0,
  ratings: 0,
  // sizes
  size_XS: 0,
  size_S: 0,
  size_M: 0,
  size_L: 0,
  size_XL: 0,
  size_XXL: 0,
  patternOrColor: {}
};

const AddWomen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    categories,
    loadingCategories,
    response
  } = useAppSelector((state) => state.categories);
  const [images, setImages] = useState<File[]>(
    []
  );
  const [show_sizes, set_show_sizes] =
    useState(false);
  const [Women_type, set_Women_type] =
    useState<'clothes' | 'shoes'>();
  const [
    shoes_sizes_count,
    set_shoes_sizes_count
  ] = useState(0);
  const [showColor, setShowColor] = useState(false)
  const [selectedOption, setSelectedOption] = useState<any>(null);

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

  const formik = useFormik({
    initialValues: initial_values,
    validationSchema: women_schema,
    onSubmit: async (
      values,
      { setSubmitting, resetForm }
    ) => {
      setSubmitting(true);
      try {
        const uploaded_images_urls =
          await upload_images({
            files: images,
            folder_name: 'Womens'
          });

        // get stock total based in individual sizes in case show_sizes is true, if not then get the stock from the stock input
        const stock_total = show_sizes
          ? Women_type === 'clothes' &&
            values.size_XS &&
            values.size_S &&
            values.size_M &&
            values.size_L &&
            values.size_XL &&
            values.size_XXL
            ? values.size_XS +
            values.size_S +
            values.size_M +
            values.size_L +
            values.size_XL +
            values.size_XXL
            : Array.from(
              {
                length: shoes_sizes_count
              },
              (_, index) => ({
                name: values[
                  `shoes_size_${index}`
                ],
                quantity:
                  values[
                  `shoes_quantity_${index}`
                  ]
              })
            ).reduce(
              (acc, shoe_size) =>
                acc + (shoe_size.quantity ?? 0),
              0
            )
          : values.stock;
        const new_Women: any = {
          name: values.name,
          main_image_url: uploaded_images_urls?.[0] ?? '',
          category_id: values.category_id,
          images: uploaded_images_urls ?? [],
          price: values.price ? values.price : 0,
          patternOrColor: selectedOption ? selectedOption : {},
          discount_percentage: values.discount_percentage ?? 0,
          discount_price: values.discount_number ?? 0,
          ratings: 0,
          stock: stock_total,
          // depending on the Women type, the sizes will be different
          sizes: show_sizes
            ? Women_type === 'clothes'
              ? [
                {
                  name: 'XS',
                  quantity: values.size_XS
                },
                {
                  name: 'S',
                  quantity: values.size_S
                },
                {
                  name: 'M',
                  quantity: values.size_M
                },
                {
                  name: 'L',
                  quantity: values.size_L
                },
                {
                  name: 'XL',
                  quantity: values.size_XL
                },
                {
                  name: 'XXL',
                  quantity: values.size_XXL
                }
              ]
              : shoes_sizes_count > 0
                ? // loop over the shoes sizes and grab the name and quantity. if the name and quantity are undefined then don't add them to the array
                Array.from(
                  {
                    length: shoes_sizes_count
                  },
                  (_, index) => ({
                    name: values[`shoes_size_${index}`],
                    quantity: values[`shoes_quantity_${index}`]
                  })
                ).filter(
                  (shoe_size) => shoe_size.name &&
                    shoe_size.quantity
                )
                : []
            : [],
          points: 0,
          description: values.description,
          created_at: Date.now(),
          featured: false,
          discount_type: values.discount_type ?? 'percentage',
        };
        dispatch(addWoman(new_Women));
        dispatch(fetchWomen());
        navigate('/apps/Womens');
      } catch (e) {
        console.error(e);
      } finally {
        setSubmitting(false);
        // refresh the page
        if (response === false) {
          resetForm();
        }
      }
    }
  });

  const handle_image_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const new_images = Array.from(
        event.target.files
      );
      setImages([...images, ...new_images]);
    }
  };

  const handle_remove_image = (
    removeIdx: number
  ) => {
    const new_images = images.filter(
      (_, index) => index !== removeIdx
    );
    setImages(new_images);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <PageTitle>Add Women</PageTitle>

      <div className=" card mb-5 mb-xl-10 p-10 ">
        <section className="panel panel-default">
          <div className="panel-body">
            <form
              id="kt_modal_add_user_form"
              className="form"
              onSubmit={formik.handleSubmit}
              noValidate
            >
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
                {/* begin::Label */}
                <label className="required fw-bold fs-6 mb-2">
                  Images
                </label>
                {/* end::Label */}
                <div className="d-flex">
                  {images.length === 0 && (
                    <div className="fv-row  justify-content-center mb-7">
                      {/* select images */}

                      <input
                        type="file"
                        name="avatar"
                        multiple
                        onChange={
                          handle_image_change
                        }
                        accept=".png, .jpg, .jpeg"
                      />
                    </div>
                  )}
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="fv-row  justify-content-center mb-7 me-3 "
                    >
                      <div
                        className="image-input image-input-outline p"
                        data-kt-image-input="true"
                        style={{
                          backgroundImage: `url('${URL.createObjectURL(
                            image
                          )}')`
                        }}
                      >
                        {/* begin::Preview existing avatar */}
                        <div
                          className="image-input-wrapper w-125px h-125px"
                          style={{
                            backgroundImage: `url('${URL.createObjectURL(
                              image
                            )}')`
                          }}
                        ></div>
                        {/* end::Preview existing avatar */}

                        {/* begin::Label */}
                        <label
                          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                          data-kt-image-input-action="change"
                          data-bs-toggle="tooltip"
                          title="Change avatar"
                          onClick={() =>
                            handle_remove_image(
                              index
                            )
                          }
                        >
                          <i className="bi bi-x fs-7"></i>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {images.length > 0 && (
                  <div className="fv-row  justify-content-center mb-7 me-3 ">
                    <div
                      className={`image-input image-input-outline`}
                      data-kt-image-input="true"
                      id="kt_image_1"
                    >
                      {/* begin::Preview existing avatar */}
                      <div
                        className="image-input-wrapper w-50px h-50px"
                        style={{
                          backgroundImage: `url('${toAbsoluteUrl(
                            '/media/image.png'
                          )}')`
                        }}
                      ></div>
                      {/* end::Preview existing avatar */}

                      {/* begin::Label */}
                      <label
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                        data-kt-image-input-action="change"
                        data-bs-toggle="tooltip"
                        title="Change avatar"
                      >
                        <i className="bi bi-plus fs-7"></i>
                        {/* begin::Inputs */}
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          {...formik.getFieldProps(
                            'images'
                          )}
                          name="images"
                          multiple
                          onChange={
                            handle_image_change
                          }
                        />
                        <input
                          type="hidden"
                          name="profile_avatar_remove"
                        />
                        {/* end::Inputs */}
                      </label>
                      {/* end::Label */}
                    </div>
                  </div>
                )}

                <div className="d-flex flex-sm-row flex-column  gap-1 ">
                  {/* begin::Input group */}
                  <div className="col-md-12 mb-7">
                    {/* begin::Label */}
                    <label className="required fw-bold fs-6 mb-2">
                      Name
                    </label>
                    {/* end::Label */}

                    {/* begin::Input */}
                    <input
                      placeholder="name"
                      {...formik.getFieldProps(
                        'name'
                      )}
                      type="text"
                      name="name"
                      className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        {
                          'is-invalid':
                            formik.touched &&
                            formik.errors.name
                        },
                        {
                          'is-valid':
                            formik.touched.name &&
                            !formik.errors.name
                        }
                      )}
                      autoComplete="off"
                      disabled={
                        formik.isSubmitting ||
                        loadingCategories
                      }
                    />

                    {/* end::Input */}
                  </div>
                </div>
              </div>

              {/* end::Scroll */}
              <div className="d-flex flex-sm-row flex-column mb-7 gap-1">
                <div className="col-md-6 mr-3">
                  <label className="fw-bold fs-6 mb-2">
                    Discount Type:
                  </label>
                  <select
                    className="form-select form-select-solid"
                    {...formik.getFieldProps(
                      'discount_type'
                    )}
                  >
                    <option value="percentage">
                      Percentage
                    </option>
                    <option value="price">
                      Price
                    </option>
                  </select>
                </div>

                <div className="col-md-6">
                  {formik.values.discount_type ===
                    'percentage' ? (
                    <>
                      <label className="fw-bold fs-6 mb-2">
                        Discount Percentage:
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps(
                          'discount'
                        )}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {
                            'is-invalid':
                              formik.touched &&
                              formik.errors
                                .discount_percentage
                          },
                          {
                            'is-valid':
                              formik.touched
                                .name &&
                              !formik.errors
                                .discount_percentage
                          }
                        )}
                        autoComplete="off"
                        disabled={
                          formik.isSubmitting ||
                          loadingCategories
                        }
                        name="discount"
                        id="discount"
                        placeholder="ex: 5"
                      />
                    </>
                  ) : (
                    <>
                      <label className="fw-bold fs-6 mb-2">
                        Discount Value:
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps(
                          'discount_number'
                        )}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {
                            'is-invalid':
                              formik.touched &&
                              formik.errors
                                .discount_number
                          },
                          {
                            'is-valid':
                              formik.touched
                                .name &&
                              !formik.errors
                                .discount_number
                          }
                        )}
                        autoComplete="off"
                        disabled={
                          formik.isSubmitting ||
                          loadingCategories
                        }
                        name="discount_number"
                        id="discount_number"
                        placeholder="ex: 5"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* categories */}
              <div className="d-flex flex-sm-row flex-column  gap-1 ">
                <div className="col-md-6 mb-7">
                  <label className="required fw-bold fs-6 mb-2">
                    Category:{' '}
                  </label>
                  <select
                    className="form-select form-select-solid"
                    {...formik.getFieldProps(
                      'category_id'
                    )}
                    name="category_id"
                    id="category_id"
                    disabled={
                      formik.isSubmitting ||
                      loadingCategories
                    }
                  >
                    <option value="">
                      Select Category
                    </option>
                    {categories.map(
                      (category: any, index) => (
                        <option
                          key={index}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="d-flex flex-sm-row flex-column  gap-1 ">
                  <div className="col-md-6 mb-7">
                    <label className="required fw-bold fs-6 mb-2">
                      Price:{' '}
                    </label>
                    <input
                      type="number"
                      {...formik.getFieldProps(
                        'price'
                      )}
                      className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        {
                          'is-invalid':
                            formik.touched &&
                            formik.errors.price
                        },
                        {
                          'is-valid':
                            formik.touched
                              .price &&
                            !formik.errors.price
                        }
                      )}
                      autoComplete="off"
                      disabled={
                        formik.isSubmitting ||
                        loadingCategories
                      }
                      min={1}
                      name="price"
                      id="price"
                      placeholder="100"
                    />
                  </div>
                  {!show_sizes && (
                    <div className="col-md-6 col-sm-12 mb-7">
                      <label className="required fw-bold fs-6 mb-2">
                        Stock:{' '}
                      </label>
                      <input
                        type="number"
                        {...formik.getFieldProps(
                          'stock'
                        )}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {
                            'is-invalid':
                              formik.touched &&
                              formik.errors.stock
                          },
                          {
                            'is-valid':
                              formik.touched
                                .stock &&
                              !formik.errors.stock
                          }
                        )}
                        autoComplete="off"
                        disabled={
                          formik.isSubmitting ||
                          loadingCategories
                        }
                        min={1}
                        name="stock"
                        id="stock"
                        placeholder="14"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className={clsx({
                      'col-md-col gap-3':
                        showColor,
                      'mb-7': !showColor
                    })}
                    style={{ marginTop: '1rem' }}
                  >
                    <input
                      type="checkbox"
                      checked={showColor}
                      onChange={() =>
                        setShowColor(!showColor)
                      }
                    />
                    <span className=" fw-bold fs-6 mx-4">
                      Has color or pattern
                    </span>
                  </label>
                </div>
                {/* size component */}
                <div>
                  <label
                    className={clsx({
                      'col-md-col gap-3':
                        show_sizes,
                      'mb-7': !show_sizes
                    })}
                    style={{ marginTop: '1rem' }}
                  >
                    <input
                      type="checkbox"
                      checked={show_sizes}
                      onChange={() =>
                        set_show_sizes(!show_sizes)
                      }
                    />
                    <span className=" fw-bold fs-6 mx-4">
                      Size?
                    </span>
                  </label>
                </div>

                {/* begin::Sizes Inputs */}
                {show_sizes && (
                  <>
                    <div className="d-flex flex-sm-row flex-column  gap-1 ">
                      <div className="col-md-6 mb-7">
                        <label
                          className="required fw-bold fs-6 mb-2"
                          style={{
                            marginTop: '1rem'
                          }}
                        >
                          Women Type:
                        </label>
                        <select
                          className="form-select form-select-solid"
                          onChange={(e) =>
                            set_Women_type(
                              e.target
                                .value as any
                            )
                          }
                        >
                          <option value="">
                            Select Women Type
                          </option>
                          <option value="clothes">
                            Clothes
                          </option>
                          <option value="shoes">
                            Shoes
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-col gap-3 my-7">
                      {Women_type ===
                        'clothes' && (
                          <div className="col-md-col gap-3 my-7">
                            <fieldset className="container">
                              <legend>Sizes</legend>
                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 align-items-center row"
                              >
                                <label
                                  htmlFor="size_XS"
                                  className="col"
                                >
                                  XS
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_XS'
                                  )}
                                  type="number"
                                  name="size_XS"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 ml-5 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_XS
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_XS &&
                                        !formik
                                          .errors
                                          .size_XS
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 align-items-center row"
                              >
                                <label
                                  className="col"
                                  htmlFor="size_S"
                                >
                                  S
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_S'
                                  )}
                                  type="number"
                                  name="size_S"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_S
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_S &&
                                        !formik
                                          .errors
                                          .size_S
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 gap-4 align-items-center row"
                              >
                                <label
                                  htmlFor="size_M"
                                  className="col"
                                >
                                  M
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_M'
                                  )}
                                  type="number"
                                  name="size_M"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_M
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_M &&
                                        !formik
                                          .errors
                                          .size_M
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 gap-4 align-items-center row"
                              >
                                <label
                                  htmlFor="size_L"
                                  className="col"
                                >
                                  L
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_L'
                                  )}
                                  type="number"
                                  name="size_L"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_L
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_L &&
                                        !formik
                                          .errors
                                          .size_L
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 gap-4 align-items-center row"
                              >
                                <label
                                  htmlFor="size_XL"
                                  className="col"
                                >
                                  XL
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_XL'
                                  )}
                                  type="number"
                                  name="size_XL"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_XL
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_XL &&
                                        !formik
                                          .errors
                                          .size_XL
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  width:
                                    'fit-content'
                                }}
                                className="d-flex flex-sm-row mb-7 gap-4 align-items-center row"
                              >
                                <label
                                  htmlFor="size_XXL"
                                  className="col"
                                >
                                  XXL
                                </label>
                                <input
                                  placeholder="20"
                                  {...formik.getFieldProps(
                                    'size_XXL'
                                  )}
                                  type="number"
                                  name="size_XXL"
                                  className={clsx(
                                    'form-control form-control-solid mb-3 mb-lg-0 col',
                                    {
                                      'is-invalid':
                                        formik.touched &&
                                        formik
                                          .errors
                                          .size_XXL
                                    },
                                    {
                                      'is-valid':
                                        formik
                                          .touched
                                          .size_XXL &&
                                        !formik
                                          .errors
                                          .size_XXL
                                    }
                                  )}
                                  style={{
                                    maxWidth:
                                      '10rem'
                                  }}
                                  autoComplete="off"
                                  disabled={
                                    formik.isSubmitting ||
                                    loadingCategories
                                  }
                                />
                              </div>
                            </fieldset>
                          </div>
                        )}
                      {Women_type ===
                        'shoes' && (
                          <>
                            {/* loop over the shoes_sizes_count and render two input fields for the name and quantity of the shoe size */}
                            {Array.from(
                              {
                                length:
                                  shoes_sizes_count
                              },
                              (_, index) => (
                                <div
                                  key={index}
                                  className="d-flex flex-sm-row flex-column  gap-1 "
                                >
                                  <div className="col-md-6 mb-7">
                                    <label className="required fw-bold fs-6 mb-2">
                                      Shoe Size:
                                    </label>
                                    <input
                                      type="text"
                                      {...formik.getFieldProps(
                                        `shoes_size_${index}`
                                      )}
                                      className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {
                                          'is-invalid':
                                            formik.touched &&
                                            formik
                                              .errors[
                                            `shoes_size_${index}`
                                            ]
                                        },
                                        {
                                          'is-valid':
                                            formik
                                              .touched[
                                            `shoes_size_${index}`
                                            ] &&
                                            !formik
                                              .errors[
                                            `shoes_size_${index}`
                                            ]
                                        }
                                      )}
                                      autoComplete="off"
                                      disabled={
                                        formik.isSubmitting ||
                                        loadingCategories
                                      }
                                      name={`shoes_size_${index}`}
                                      id={`shoes_size_${index}`}
                                      placeholder="Size"
                                    />
                                  </div>
                                  <div className="col-md-6 col-sm-12 mb-7">
                                    <label className="required fw-bold fs-6 mb-2">
                                      Quantity:
                                    </label>
                                    <input
                                      type="number"
                                      {...formik.getFieldProps(
                                        `shoes_quantity_${index}`
                                      )}
                                      className={clsx(
                                        'form-control form-control-solid mb-3 mb-lg-0',
                                        {
                                          'is-invalid':
                                            formik.touched &&
                                            formik
                                              .errors[
                                            `shoes_quantity_${index}`
                                            ]
                                        },
                                        {
                                          'is-valid':
                                            formik
                                              .touched[
                                            `shoes_quantity_${index}`
                                            ] &&
                                            !formik
                                              .errors[
                                            `shoes_quantity_${index}`
                                            ]
                                        }
                                      )}
                                      autoComplete="off"
                                      disabled={
                                        formik.isSubmitting ||
                                        loadingCategories
                                      }
                                      name={`shoes_quantity_${index}`}
                                      id={`shoes_quantity_${index}`}
                                      placeholder="Quantity"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                            {/* Add button that when clicked will create a new input field to insert the desired name, and quantity of shoes sizes */}
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() =>
                                set_shoes_sizes_count(
                                  shoes_sizes_count +
                                  1
                                )
                              }
                            >
                              + Add Shoe Size
                            </button>
                          </>
                        )}
                    </div>
                  </>
                )}
                {/* end::Sizes Inputs */}
              </div>

              {/* begin::Input group */}
              <div className="fv-row mb-7">
                {/* begin::Label */}
                <label className="required fw-bold fs-6 mb-2">
                  Description
                </label>
                {/* end::Label */}

                {/* begin::Input */}
                <textarea
                  {...formik.getFieldProps(
                    'description'
                  )}
                  name="description"
                  id=""
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    {
                      'is-invalid':
                        formik.touched &&
                        formik.errors.description
                    },
                    {
                      'is-valid':
                        formik.touched.name &&
                        !formik.errors.description
                    }
                  )}
                  autoComplete="off"
                  disabled={
                    formik.isSubmitting ||
                    loadingCategories
                  }
                ></textarea>
              </div>
              {/* end::Input group */}

              {/* begin::Actions */}
              <div className="text-center pt-15">
                <button
                  type="reset"
                  className="btn btn-light me-3"
                  data-kt-users-modal-action="cancel"
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-kt-users-modal-action="submit"
                  disabled={
                    loadingCategories ||
                    formik.isSubmitting ||
                    !formik.isValid ||
                    !formik.touched
                  }
                >
                  {!loadingCategories &&
                    !formik.isSubmitting && (
                      <span className="indicator-label">
                        Submit
                      </span>
                    )}
                  {(loadingCategories ||
                    formik.isSubmitting) && (
                      <span
                        className="indicator-progress"
                        style={{ display: 'block' }}
                      >
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    )}
                </button>
              </div>
              {/* end::Actions */}
            </form>
          </div>
        </section >

        {(loadingCategories ||
          formik.isSubmitting) && (
            <ProcessingLoader />
          )
        }
      </div >
    </>
  );
};

export default AddWomen;

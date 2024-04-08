import clsx from 'clsx';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toAbsoluteUrl } from '../../../../_duhope/helpers';
import { PageTitle } from '../../../../_duhope/layout/core';
import { delete_images, upload_images } from './utils';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { edit_product, fetch_products, get_product_by_id } from '../../../redux/products/actions';
import { fetchCategories } from '../../../redux/features/categories/categoriesActions'
import { Woman } from './women-list/core/_models'
import { ProcessingLoader } from '../../../components/loaders/processingLoader'


const EditWomen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const {
    categories,
    loadingCategories,
    response
  } = useAppSelector((state) => state.categories);
  const [
    shoes_sizes_count,
    set_shoes_sizes_count
  ] = useState(0);
  const [images, set_images] = useState<File[]>([]);
  const [image_urls, set_image_urls] = useState<string[]>([]);
  const [show_sizes, set_show_sizes] = useState(false);
  const [showColor, setShowColor] = useState(false)
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [productToEdit, setProductToEdit] = useState<any>(null)
  const [product_type, set_product_type] =
    useState<'clothes' | 'shoes'>();

  useEffect(() => {
    if (!productToEdit) {
      return
    }
    if (productToEdit?.images?.length > 0) {
      set_image_urls(productToEdit.images);
    }
    if (productToEdit?.sizes?.length > 0 && !show_sizes) {
      set_show_sizes(true);
    }
    if (Object.keys(productToEdit?.patternOrColor).length > 0) {
      setSelectedOption(productToEdit?.patternOrColor)
    }
  }, [productToEdit, image_urls, show_sizes, selectedOption]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await dispatch(get_product_by_id(productId));
      if (!res) {
        return null; // Return null or handle the error accordingly
      }
      return res.payload;
    };

    const fetchProduct = async () => {
      const product: any = await getProduct();

      if (!product) {
        return null
      }
      setProductToEdit(product);
      dispatch(fetchCategories());
    };

    fetchProduct();
  }, [dispatch, productId]);

  const initial_values: any = {
    name: productToEdit?.name ?? '',
    description: productToEdit?.description ?? '',
    category_id: productToEdit?.category_id ?? '',
    price: productToEdit?.price ?? 0,
    stock: productToEdit?.stock ?? 0,
    discount_type: productToEdit?.discount_type ?? 'percentage',
    discount_number: productToEdit?.discount_price ?? 0,
    discount_percentage: productToEdit?.discount_percentage ?? 0,
    images: [],
    main_image_url: productToEdit?.main_image_url ?? '',
    featured: productToEdit?.featured ?? false,
    points: productToEdit?.points ?? 0,
    ratings: productToEdit?.ratings ?? 0,
    // sizes
    size_XS: productToEdit?.sizes?.find((size) => size.name === 'XS')?.quantity ?? 0,
    size_S: productToEdit?.sizes?.find((size) => size.name === 'S')?.quantity ?? 0,
    size_M: productToEdit?.sizes?.find((size) => size.name === 'M')?.quantity ?? 0,
    size_L: productToEdit?.sizes?.find((size) => size.name === 'L')?.quantity ?? 0,
    size_XL: productToEdit?.sizes?.find((size) => size.name === 'XL')?.quantity ?? 0,
    size_XXL: productToEdit?.sizes?.find((size) => size.name === 'XXL')?.quantity ?? 0,
    patternOrColor: productToEdit?.patternOrColor ?? {},
  };

  const formik = useFormik({
    initialValues: initial_values,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const old_images = productToEdit?.images ?? [];
        let images_to_upload = [...old_images];
        // check if they added new images
        if (images.length > 0) {
          const new_images = await upload_images({ files: images, folder_name: 'products' });
          // add those images to the images to upload
          if (new_images) images_to_upload = [...images_to_upload, ...new_images];
        }
        // check if they removed some images, comparing against the image_urls state
        const images_to_delete = old_images.filter((image) => !image_urls.includes(image));
        if (images_to_delete.length > 0) {
          // remove those images from the images to upload

          images_to_upload = images_to_upload.filter((image) => !images_to_delete.includes(image));
          // delete those images from the bucket
          await delete_images(images_to_delete);
        }
        const stock_total = show_sizes
          ? product_type === 'clothes' &&
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

        const updated_product: any = {
          id: productId,
          name: values.name,
          main_image_url: images_to_upload[0],
          category_id: values.category_id,
          images: images_to_upload,
          price: values.price ? values.price : 0,
          discount_percentage: values.discount_percentage ?? 0,
          discount_price: values.discount_number ?? 0,
          ratings: 0,
          stock: stock_total,
          sizes: show_sizes
            ? product_type === 'clothes'
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
        dispatch(edit_product(updated_product));
        dispatch(fetch_products());
        navigate('/apps/products');
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

  const handle_image_change = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const new_images = Array.from(event.target.files);
      set_images([...images, ...new_images]);
    }
  };

  const handle_remove_image = (remove_index: number) => {
    const new_images = images.filter((_, index) => index !== remove_index);
    set_images(new_images);
  };

  const handle_remove_image_from_urls = (remove_index: number) => {
    const new_image_urls = image_urls.filter((_, index) => index !== remove_index);
    set_image_urls(new_image_urls);
  };

  return (
    <>
      <PageTitle>Edit Product</PageTitle>

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
                <label className="required fw-bold fs-6 mb-2">Images</label>
                {/* end::Label */}
                <div className="d-flex">
                  {image_urls &&
                    image_urls.map((image, index) => (
                      <div key={image} className="fv-row  justify-content-center mb-7 me-3 ">
                        <div
                          className={
                            `image-input image-input-outline` +
                            (index === 0 ? ' border border-3 border-danger' : '')
                          }
                          data-kt-image-input="true"
                          id="kt_image_1"
                          style={{
                            backgroundImage: `url('${image}')`
                          }}
                        >
                          {/* begin::Preview existing avatar */}
                          <div
                            className="image-input-wrapper w-125px h-125px"
                            style={{
                              backgroundImage: `url('${image}')`
                            }}
                            onMouseOver={
                              // add border
                              (e) => {
                                e.currentTarget.classList.add('border');
                                e.currentTarget.classList.add('border-3');
                                e.currentTarget.classList.add('border-danger');
                              }
                            }
                            onMouseOut={
                              // remove border
                              (e) => {
                                e.currentTarget.classList.remove('border');
                                e.currentTarget.classList.remove('border-3');
                                e.currentTarget.classList.remove('border-danger');
                              }
                            }
                            onClick={() => {
                              // set as main image
                              const new_image_urls = [...image_urls];
                              new_image_urls.splice(index, 1);
                              new_image_urls.unshift(image);
                              set_image_urls(new_image_urls);
                            }}
                          ></div>
                          {/* end::Preview existing avatar */}

                          {/* begin::Label */}
                          <label
                            className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            data-kt-image-input-action="change"
                            data-bs-toggle="tooltip"
                            title="Change avatar"
                            onClick={() => handle_remove_image_from_urls(index)}
                          >
                            <i className="bi bi-x fs-7"></i>
                          </label>
                        </div>
                      </div>
                    ))}

                  {images.map((image, index) => (
                    <div key={index} className="fv-row  justify-content-center mb-7 me-3 ">
                      <div
                        className={
                          `image-input image-input-outline` +
                          (index === 0 ? ' border border-3 border-danger' : '')
                        }
                        data-kt-image-input="true"
                        id="kt_image_1"
                        style={{
                          backgroundImage: `url('${URL.createObjectURL(image)}')`
                        }}
                      >
                        {/* begin::Preview existing avatar */}
                        <div
                          className="image-input-wrapper w-125px h-125px"
                          style={{
                            backgroundImage: `url('${URL.createObjectURL(image)}')`
                          }}
                          onMouseOver={
                            // add border
                            (e) => {
                              e.currentTarget.classList.add('border');
                              e.currentTarget.classList.add('border-3');
                              e.currentTarget.classList.add('border-danger');
                            }
                          }
                          onMouseOut={
                            // remove border
                            (e) => {
                              e.currentTarget.classList.remove('border');
                              e.currentTarget.classList.remove('border-3');
                              e.currentTarget.classList.remove('border-danger');
                            }
                          }
                          onClick={() => handle_remove_image(index)}
                        ></div>
                        {/* end::Preview existing avatar */}

                        {/* begin::Label */}
                        <label
                          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                          data-kt-image-input-action="change"
                          data-bs-toggle="tooltip"
                          title="Change avatar"
                          onClick={() => handle_remove_image(index)}
                        >
                          <i className="bi bi-x fs-7"></i>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
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
                        backgroundImage: `url('${toAbsoluteUrl('/media/image.png')}')`
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
                        {...formik.getFieldProps('images')}
                        name="images"
                        onChange={handle_image_change}
                      />
                      {/* end::Inputs */}
                    </label>
                    {/* end::Label */}
                  </div>
                </div>

                <div className="d-flex flex-sm-row flex-column  gap-1 ">
                  {/* begin::Input group */}
                  <div className="col-md-12 mb-7">
                    {/* begin::Label */}
                    <label className="required fw-bold fs-6 mb-2">Name</label>
                    {/* end::Label */}

                    {/* begin::Input */}
                    <input
                      {...formik.getFieldProps('name')}
                      type="text"
                      name="name"
                      className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        { 'is-invalid': formik.touched && formik.errors.name },
                        {
                          'is-valid': formik.touched.name && !formik.errors.name
                        }
                      )}
                      autoComplete="off"
                      disabled={formik.isSubmitting || loadingCategories}
                    />

                    {/* end::Input */}
                  </div>
                </div>
              </div>
              {/* end::Scroll */}
              <div className="d-flex flex-sm-row flex-column mb-7 gap-1">
                <div className="col-md-6 mr-3">
                  <label className="fw-bold fs-6 mb-2">Discount Type:</label>
                  <select
                    className="form-select form-select-solid"
                    {...formik.getFieldProps('discount_type')}
                    name="discount_type"
                    id="discount_type"
                    disabled={formik.isSubmitting || loadingCategories}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                <div className="col-md-6">
                  {formik.values.discount_type === 'percentage' ? (
                    <>
                      <label className="fw-bold fs-6 mb-2">Discount Percentage:</label>
                      <input
                        type="number"
                        {...formik.getFieldProps('discount')}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          { 'is-invalid': formik.touched && formik.errors.discount_percentage },
                          {
                            'is-valid': formik.touched.name && !formik.errors.discount_percentage
                          }
                        )}
                        autoComplete="off"
                        disabled={formik.isSubmitting || loadingCategories}
                        name="discount"
                        id="discount"
                        placeholder="ex: 5"
                        min={1}
                      />
                    </>
                  ) : (
                    <>
                      <label className="fw-bold fs-6 mb-2">Discount Value:</label>
                      <input
                        type="number"
                        {...formik.getFieldProps('discount_number')}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          { 'is-invalid': formik.touched && formik.errors.discount_number },
                          {
                            'is-valid': formik.touched.name && !formik.errors.discount_number
                          }
                        )}
                        autoComplete="off"
                        disabled={formik.isSubmitting || loadingCategories}
                        name="discount_number"
                        id="discount_number"
                        placeholder="ex: 5"
                        min={1}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* categories */}
              <div className="d-flex flex-sm-row flex-column  gap-1 ">
                <div className="col-md-6 mb-7">
                  <label className="required fw-bold fs-6 mb-2">Category: </label>
                  <select
                    className="form-select form-select-solid"
                    {...formik.getFieldProps('category_id')}
                    name="category_id"
                    id="category_id"
                    disabled={formik.isSubmitting || loadingCategories}
                  >
                    <option>Select Category</option>
                    {categories.map((category: any, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="d-flex flex-sm-row flex-column  gap-1 ">
                  <div className="col-md-6 mb-7">
                    <label className="required fw-bold fs-6 mb-2">Price: </label>
                    <input
                      type="number"
                      {...formik.getFieldProps('price')}
                      className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        { 'is-invalid': formik.touched && formik.errors.price },
                        {
                          'is-valid': formik.touched.price && !formik.errors.price
                        }
                      )}
                      autoComplete="off"
                      disabled={formik.isSubmitting || loadingCategories}
                      name="price"
                      id="price"
                      placeholder="100"
                      min={1}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mb-7">
                    <label className="required fw-bold fs-6 mb-2">Stock: </label>
                    <input
                      type="number"
                      {...formik.getFieldProps('stock')}
                      className={clsx(
                        'form-control form-control-solid mb-3 mb-lg-0',
                        { 'is-invalid': formik.touched && formik.errors.stock },
                        {
                          'is-valid': formik.touched.stock && !formik.errors.stock
                        }
                      )}
                      autoComplete="off"
                      disabled={formik.isSubmitting || loadingCategories}
                      name="stock"
                      id="stock"
                      placeholder="14"
                      min={1}
                    />
                  </div>
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
                      checked={showColor || selectedOption !== null}
                      onChange={() =>
                        setShowColor(!showColor)
                      }
                    />
                    <span className=" fw-bold fs-6 mx-4">
                      Has color or pattern
                    </span>
                  </label>
                </div>
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
                          Product Type:
                        </label>
                        <select
                          className="form-select form-select-solid"
                          onChange={(e) =>
                            set_product_type(
                              e.target
                                .value as any
                            )
                          }
                        >
                          <option value="">
                            Select Product Type
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
                      {product_type ===
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
                      {product_type ===
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
                <label className="required fw-bold fs-6 mb-2">Description</label>
                {/* end::Label */}

                {/* begin::Input */}
                <textarea
                  {...formik.getFieldProps('description')}
                  name="description"
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': formik.touched && formik.errors.description },
                    {
                      'is-valid': formik.touched.name && !formik.errors.description
                    }
                  )}
                  autoComplete="off"
                  disabled={formik.isSubmitting || loadingCategories}
                ></textarea>
              </div>
              {/* end::Input group */}

              {/* begin::Actions */}
              <div className="text-center pt-15">
                <button
                  type="reset"
                  className="btn btn-light me-3"
                  data-kt-users-modal-action="cancel"
                  onClick={() => navigate('/apps/products')}
                >
                  Discard
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-kt-users-modal-action="submit"
                  disabled={
                    loadingCategories || formik.isSubmitting || !formik.isValid || !formik.touched
                  }
                >
                  {!loadingCategories && !formik.isSubmitting && (
                    <span className="indicator-label">Update</span>
                  )}
                  {(loadingCategories || formik.isSubmitting) && (
                    <span className="indicator-progress" style={{ display: 'block' }}>
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
              {/* end::Actions */}
            </form>
          </div>
        </section>

        {(loadingCategories || formik.isSubmitting) && <ProcessingLoader />}
      </div>
    </>
  );
};

export default EditWomen;

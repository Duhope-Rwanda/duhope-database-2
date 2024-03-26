import React, { useState, useEffect } from 'react';
import { OrderProducts } from './Products';
import { KTIcon } from '../../../../../_powr/helpers';
import { createOrder } from '../../../../services/shipping.service'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { changeOrderStatus, addShippingDocumentLink } from '../../../../redux/features/orders/orderActions'

export function Overview({ order }) {
  const [openDetails, setOpenDetails] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    names: "",
    telephone: "",
    address: "",
    city: "",
    numberOfParcel: 0,
    weight: 0,
    email: "",
    postalCode: "",
    country: "",
    province: "",
    district: "",
    totalValue: 0
  })

  useEffect(() => {
    if (!order) {
      return
    }
    setFormData({
      names: order.names,
      telephone: order.address?.telephone1,
      address: order.address?.street,
      city: order.address?.city,
      email: order.email,
      postalCode: order.address?.postalCode,
      country: order.address?.country,
      province: "",
      district: "",
      totalValue: order.total,
      numberOfParcel: 0,
      weight: 0,
    })
  }, [order]);

  const safeAccess = (propertyPath, defaultValue = '') => {
    return propertyPath.reduce((acc, key) => (acc && acc[key] ? acc[key] : defaultValue), formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { responseCode, responseMessage, waybillFileUrl } = await createOrder(formData)
    if (responseCode !== "100") {
      setLoading(false)
      return toast.error(responseMessage)
    }
    toast.success("You've successfully created a shipping order")
    await dispatch(changeOrderStatus({ orderId: order.id, status: "on delivery" }) as any)
    await dispatch(addShippingDocumentLink({ orderId: order.id, shippingDocumentlink: waybillFileUrl }) as any)
    window.location.replace("/apps/orders")
    setLoading(false)
  }
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Customer Details</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{safeAccess(['names'])}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Contact Email</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{safeAccess(['email'])}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Telephone</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{safeAccess(['telephone'])}</span>
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address</label>
            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>
                {order.address ? `${order.address.country}, ${order.address.city}, ${order.address.street}, ${order.address.postalCode}` : 'N/A'}
              </span>
            </div>
          </div>
          <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
            <KTIcon iconName='information-5' className='fs-2tx text-warning me-4' />
            <div className='d-flex flex-stack flex-grow-1'>
              <div className='fw-bold'>
                <h4 className='text-gray-800 fw-bolder'>Payment Type!</h4>
                <div className='fs-6 text-gray-600'>{order.paymentMethod}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0 col justify-content-between align-items-center'>
            <h3 className='fw-bolder m-0'>Shipping Details</h3>
            <div className='d-flex'>
              <div className='ml-4' style={{
                marginRight: 29.5
              }}>
                {
                  order?.shippingDocumentlink && order?.shippingDocumentlink !== "" ?
                    <button
                      className='btn btn-success  btn-sm px-4'
                      onClick={event => window.location.href = `${order?.shippingDocumentlink}`}
                    >
                      view dodument
                    </button>
                    :
                    <button
                      className='btn btn-primary  btn-sm px-4'
                      onClick={() => setOpenDetails(!openDetails)}
                    >
                      {openDetails ? "Hide details" : "show details"}
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
        {openDetails && !order?.shippingDocumentlink &&
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className=' p-9 justify-content-between'>
              <div className='d-flex justify-content-between'>
                <div className='col-5'>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold mb-3 mx-3'>Full Name</label>
                    <input
                      type='text'
                      className='form-control'
                      name="names"
                      value={formData.names}
                      onChange={(e) => setFormData({ ...formData, names: e.target.value })}
                      placeholder='Full Name'
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold mb-3 mx-3'>Telephone</label>
                    <input
                      type='text'
                      className='form-control'
                      name='telephone'
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      placeholder='Telephone'
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold mb-3 mx-3'>Address</label>
                    <input
                      type='text'
                      className='form-control'
                      name='address'
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder='Street'
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold mb-3 mx-3'>City</label>
                    <input
                      type='text'
                      className='form-control'
                      name='city'
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder='City'
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold mb-3 mx-3'>Number of parcel</label>
                    <input
                      type='number'
                      className='form-control'
                      name='parcel'
                      value={formData.numberOfParcel}
                      onChange={(e) => setFormData({ ...formData, numberOfParcel: +e.target.value })}
                      placeholder='Number of parcel'
                      min={1}
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>District</label>
                    <input
                      type='text'
                      className='form-control'
                      name='District'
                      placeholder='District'
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className='col-5'>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>Email</label>
                    <input
                      type='email'
                      required
                      className='form-control'
                      name='email'
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder='Email'
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>Country</label>
                    <input
                      type='text'
                      className='form-control'
                      name='country'
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder='Country'
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>Postal Code</label>
                    <input
                      type='text'
                      className='form-control'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder='Postal Code'
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>Weight</label>
                    <input
                      type='number'
                      className='form-control'
                      name='Weight'
                      placeholder='Weight'
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: +e.target.value })}
                      min={1}
                      required
                    />
                  </div>
                  <div className='mb-7'>
                    <label className='col-lg-4 fw-bold fw-bold mb-3 mx-3'>Province</label>
                    <input
                      type='text'
                      className='form-control'
                      name='province'
                      placeholder='province'
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-end'>
                <button
                  disabled={loading}
                  type='submit'
                  className='btn btn-primary  btn-sm px-4'
                >
                  {loading ? "Loading..." : "Confirm Shipping"}
                </button>
              </div>
            </div>
          </form>
        }
      </div>
      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-12'>
          <OrderProducts products={order.products} className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>
    </>
  );
}
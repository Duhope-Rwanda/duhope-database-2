/* eslint-disable jsx-a11y/anchor-is-valid */
import { KTIcon } from '../../../../_powr/helpers'
import { useDispatch } from "react-redux";
import { changeOrderStatus } from '../../../redux/features/orders/orderActions'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ProcessingLoader } from '../../../components/loaders/processingLoader'
import { useState } from 'react';

const OrderHeader = ({ order }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)

  const completeOrder = async () => {
    setLoading(true)
    const res = await dispatch(changeOrderStatus({ orderId: order.id, status: "completed" }) as any)
    if (!res) {
      setLoading(false)
      return toast.error("There has been an error")
    }
    toast.success("Order completed successfully")
    setLoading(false)
    window.location.replace("/apps/orders")
  }
  return (
    <>
      {loading && <ProcessingLoader />}
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <p className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {order?.paymentMethod}
                    </p>
                  </div>
                </div>
                {
                  order && order.status === "on delivery" &&
                  <div className='d-flex my-4'>
                    <div className='ml-4' style={{
                      marginRight: 29.5
                    }}>
                      <button
                        className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                        data-kt-menu-trigger='click'
                        data-kt-menu-placement='bottom-end'
                        data-kt-menu-flip='top-end'
                        onClick={() => completeOrder()}
                      >
                        <p
                          className='btn btn-sm btn-primary me-3'
                          data-kt-menu-trigger='click'
                          data-kt-menu-placement='bottom-end'
                          data-kt-menu-flip='top-end'
                        >
                          Mark as completed
                        </p>
                      </button>
                    </div>
                  </div>
                }
              </div>
              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                        <div className='fs-2 fw-bolder'>{order.price} SAR</div>
                      </div>
                      <div className='fw-bold fs-6 text-gray-400'>Total</div>
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                  <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                    <span className='fw-bold fs-6 text-gray-400'>Order Status</span>
                    <span className='fw-bolder fs-6'>{order.status === 'pending' ? '50%' : order.status === 'completed' ? '100%' : '50%'}</span>
                  </div>
                  <div className='h-5px mx-3 w-100 bg-light mb-3'>
                    <div
                      className='bg-success rounded h-5px'
                      role='progressbar'
                      style={{ width: order.status === 'pending' ? '50%' : order.status === 'completed' ? '100%' : '50%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export { OrderHeader }
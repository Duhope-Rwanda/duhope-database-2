import { useDispatch, useSelector } from "react-redux"
import { changeOrderStatus, fetchOrderById } from "../../../../redux/features/orders/orderActions";
import { useState } from "react";
import { ProcessingLoader } from "../../../../components/loaders/processingLoader"

/* eslint-disable jsx-a11y/anchor-is-valid */
export function MarkAsComplete() {

  const dispatch = useDispatch()
  // get current selected order from redux store
  const { selectedOrder } = useSelector(
    (state: any) => state.orders
  );
  // initial state
  const [status, setStatus] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const handleMarkAsComplete = async () => {
    setIsLoaded(true)
    await dispatch(changeOrderStatus({ orderId: selectedOrder.id, status }) as any)
    await dispatch(fetchOrderById(selectedOrder.id) as any)
    // data-kt-menu-dismiss='true'
    // close modal after submit

    const doc = document.getElementById('modal')
    doc?.classList.remove('show')
    setIsLoaded(false)
  }

  return (
    <>
      <div id='modal' className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Order Status</div>
        </div>

        <div className='separator border-gray-200'></div>

        <div className='px-7 py-5'>
          <div className='mb-10'>
            <label className='form-label fw-bold'>Status:</label>

            <div>
              <select
                className='form-select form-select-solid'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={`${selectedOrder.status}`.toLowerCase()}
              >
                <option value='completed'>Completed</option>
                <option value='pending'>Pending</option>
                <option value='delivered'>delivered</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
          </div>



          <div className='d-flex justify-content-end'>
            <button
              type='reset'
              className='btn btn-sm btn-light btn-active-light-primary me-2'
              data-kt-menu-dismiss='true'
            >
              Reset
            </button>

            <button type='submit' onClick={(e) => handleMarkAsComplete()} className='btn btn-sm btn-primary' >
              Apply
            </button>
          </div>
        </div>
      </div>
      {isLoaded && <ProcessingLoader />}
    </>
  )
}

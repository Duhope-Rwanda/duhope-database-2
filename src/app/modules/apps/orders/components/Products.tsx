/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

type Props = {
  className: string,
  products: any

}

const OrderProducts: React.FC<Props> = ({ className, products }) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Ordered Products</span>

        </h3>

      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' >
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='border-0'>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 min-w-150px'>Name</th>
                    <th className='p-0 min-w-140px'>Price</th>
                    <th className='p-0 min-w-110px'>Quantity</th>
                    <th className='p-0 min-w-50px'>Total Price</th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>

                  {products && products.map((product: any) => (
                    <tr key={product.productId}>
                      <td>
                        <div className='symbol symbol-45px me-2'>
                          <span className='symbol-label'>
                            <img
                              src={product.main_image_url}
                              className='h-50 align-self-center'
                              alt=''
                            />
                          </span>
                        </div>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {product.name}
                        </a>

                      </td>
                      <td>

                        <span className='text-muted fw-semibold d-block'>{product.price}</span>
                      </td>
                      <td>

                        <span className='text-muted fw-semibold d-block'>{product.quantity}</span>
                      </td>
                      <td>

                        <span className='text-muted fw-semibold d-block'>{product.quantity * product.price}</span>
                      </td>


                    </tr>
                  ))

                  }

                </tbody>
                {/* end::Table body */}
              </table>
            </div>
            {/* end::Table */}
          </div>
          {/* end::Tap pane */}


        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export { OrderProducts }

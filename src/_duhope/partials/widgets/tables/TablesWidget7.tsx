/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom'

type Props = {
  className: string;
  orders: any[];
};


const TablesWidget7: React.FC<Props> = ({ className, orders }) => {
  // Extracting relevant information from orders
  const getOrderProducts = (order) => {
    return order.products[0];
  };

  const getOrderId = (order) => {
    return order.id;
  };

  const getOrderDate = (order) => {
    const orderDate = moment(order.createdAt);
    const currentDate = moment();
    const daysAgo = currentDate.diff(orderDate, 'days');

    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  };

  const getOrderStatus = (order) => {
    return order.status;
  };

  const filteredOrders = orders.map((order) => ({
    products: getOrderProducts(order),
    orderDate: getOrderDate(order),
    orderStatus: getOrderStatus(order),
    orderID: getOrderId(order),
  }));

  filteredOrders.sort((a, b) => {
    const dateA = moment(a.orderDate, 'YYYY-MM-DD');
    const dateB = moment(b.orderDate, 'YYYY-MM-DD');
    return dateA.diff(dateB);
  });

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Latest Orders</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        <div className='tab-content'>
          {/* begin::Tap pane */}
          <div className='tab-pane fade show active' id='kt_table_widget_7_tab_1'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table align-middle gs-0 gy-3'>
                {/* begin::Table head */}
                <thead>
                  <tr>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 min-w-150px'></th>
                    <th className='p-0 min-w-140px'></th>
                    <th className='p-0 min-w-120px'></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <tbody>
                  {filteredOrders.length > 0 && filteredOrders.slice(0, 5).map((order, index) =>
                    <tr key={index}>
                      <td>
                        <div className='symbol symbol-50px me-2'>
                          <span className='symbol-label bg-light-success'>
                            <img className="w-50px h-50px rounded" src={order.products.main_image_url} alt="product" />
                            {/* <KTIcon iconName='scroll' className='fs-2x text-success' /> */}
                          </span>
                        </div>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {order.products.name}
                        </a>
                        {/* <span className='text-muted fw-semibold d-block fs-7'>
                        Voice and video recorder
                      </span> */}
                      </td>
                      <td className='text-end'>
                        <span className='text-muted fw-semibold d-block fs-8'>Ordered</span>
                        <span className='text-dark fw-bold d-block fs-7'>{order.orderDate}</span>
                      </td>
                      <td className='text-end'>
                        {
                          order.orderStatus === "pending" && <span className='badge badge-light fs-7 fw-bold'>{order.orderStatus}</span>
                        }
                        {
                          order.orderStatus === "cancelled" && <span className='badge badge-light-danger fs-7 fw-bold'>{order.orderStatus}</span>
                        }
                        {
                          order.orderStatus === "on delivery" && <span className='badge badge-light-warning fs-7 fw-bold'>{order.orderStatus}</span>
                        }
                        {
                          order.orderStatus === "completed" && <span className='badge badge-light-success fs-7 fw-bold'>{order.orderStatus}</span>
                        }
                      </td>
                      <td className='text-end'>
                        <Link
                          to={`/apps/orders/${order.orderID}`}
                          className="btn btn-light btn-active-light-primary btn-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TablesWidget7 }

import React from 'react'
import { Outlet } from 'react-router-dom'
import { PageTitle } from '../../../../_powr/layout/core'
import { OrderHeader } from './OrderHeader'
import { Overview } from './components/Overview'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchOrderById } from '../../../redux/features/orders/orderActions';
import { useParams } from 'react-router-dom';
import { ProcessingLoader } from '../../../components/loaders/processingLoader'
// import { Settings } from './components/settings/Settings'

const OrderDetails: React.FC = () => {
  // get id from url
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { loading, selectedOrder } = useSelector(
    (state: any) => state.orders
  );
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchOrderById(orderId as any) as any)
    };
    fetchData();
  }, [dispatch, orderId]);

  return (
    <>
      <OrderHeader order={selectedOrder} />
      <Outlet />
      <PageTitle>Order Details</PageTitle>
      <Overview order={selectedOrder} />
      {loading && <ProcessingLoader />}
    </>
  )
}

export default OrderDetails
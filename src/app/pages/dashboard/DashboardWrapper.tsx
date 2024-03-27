/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_duhope/layout/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/features/orders/orderActions";
import { fetchUsers } from "../../redux/features/actions/users";
import chartsuccess from "../../../_duhope/assets/unicons/chart-success.png";
import WalletInfo from "../../../_duhope/assets/unicons/wallet-info.png";
import PayPalIcon from "../../../_duhope/assets/unicons/paypal.png";
import primaryIcon from "../../../_duhope/assets/unicons/cc-primary.png";
import { fetch_products } from "../../redux/products/actions";
import { useAppSelector } from "../../redux/hooks";
import { ProcessingLoader } from "../../components/loaders/processingLoader";
import LineChartComponent from "./linechart";
import LineChartSales from "./lineChartSales";
import { fetchCategories } from "../../redux/features/categories/categoriesActions";
import TopSellingProducts from "./TopSellingProducts";
import TopSellingCategories from "./TopSellingCategories";
import {
  TablesWidget5,
  TablesWidget7
} from "../../../_duhope/partials/widgets";

const DashboardPage: FC = () => {
  const styles = {
    backgroundColor: "#dcdcde",
    width: "auto",
    padding: "0.3px 0.3px",
  };
  const dispatch = useDispatch();
  const { products, loading } = useAppSelector((state) => state.productsV2);
  const { loadingCategories, categories } = useSelector(
    (state: any) => state.categories
  );

  const [orderAmount, setOrderAmount] = useState(0);
  const { orders } = useSelector((state: any) => state.orders);
  const { users } = useSelector((state: any) => state.users);
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        await Promise.all([
          dispatch(fetchOrders() as any),
          dispatch(fetchUsers() as any),
          dispatch(fetch_products() as any),
          dispatch(fetchCategories() as any),
        ]);

        if (orders.length > 0) {
          setOrderAmount(
            orders.reduce((acc, el) => acc + el.amount, 0)
          );
        }
        setLoadingData(false)
      } catch (error) {
        setLoadingData(false)
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Update orderAmount if orders are available
    if (orders.length > 0) {
      setOrderAmount(
        orders.reduce((acc, el) => acc + el.amount, 0)
      );
    }
  }, [orders]);

  // if (loading || loadingCategories || loadingData) {
  //   return <ProcessingLoader />;
  // }

  // const Title = ({ children }) => {
  //   return (
  //     <div className="w-100 d-flex my-8 justify-content-between align-items-center">
  //       <div className=" fs-md-2 fs-4 d-flex justify-content-center text-center align-items-center">
  //         <span>{children}</span>
  //       </div>
  //       <div className="" style={{ ...styles, width: "87%" }}></div>
  //     </div>
  //   );
  // };

  return (
    <div>
      data will be here
    </div>
    // <>
    //   <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
    //     <div className="container-xxl flex-grow-1 container-p-y">
    //       {/* ============ performance ============ */}
    //       <Title>Perfomance</Title>
    //       <div className="row">
    //         <div className="col-lg-12 col-md-12 order-1">
    //           <div className="row">
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={chartsuccess}
    //                         alt="chart success"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="fw-medium d-block mb-1">Products</span>
    //                   <h3 className="card-title mb-2">{products.length}</h3>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={WalletInfo}
    //                         alt="chart success"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="fw-medium d-block mb-1">Categories</span>
    //                   <h3 className="card-title mb-2">{categories.length}</h3>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={PayPalIcon}
    //                         alt="Credit Card"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="d-block mb-1">Numbers</span>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={WalletInfo}
    //                         alt="chart success"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="fw-medium d-block mb-1">
    //                     Income
    //                   </span>
    //                   <h3 className="card-title mb-2">
    //                     {orderAmount.toFixed(2)}
    //                   </h3>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={WalletInfo}
    //                         alt="chart success"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="fw-medium d-block mb-1">Users</span>
    //                   <h3 className="card-title mb-2">
    //                     {users && users.length}
    //                   </h3>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-2 col-md-6 col-6 mb-4">
    //               <div className="card">
    //                 <div className="card-body">
    //                   <div className="card-title d-flex align-items-start justify-content-between">
    //                     <div className="avatar flex-shrink-0">
    //                       <img
    //                         src={primaryIcon}
    //                         alt="Credit Card"
    //                         className="rounded"
    //                       />
    //                     </div>
    //                   </div>
    //                   <span className="fw-medium d-block mb-1">Orders</span>
    //                   <h3 className="card-title mb-2">{orders.length}</h3>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* -------------End First 2 cards----------- */}
    //       </div>
    //       {/* ============ Charts ============ */}
    //       <Title>Charts</Title>
    //       <div className="row">
    //         <div className="col-lg-6 col-md-12 col-sm-12 col-12 order-1 mb-4">
    //           <div className="card">
    //             <div className="card-header d-flex align-items-center justify-content-between pb-0">
    //               <div className="card-title mb-0">
    //                 <h5 className="m-0 me-2">Orders Statistics</h5>
    //               </div>
    //             </div>
    //             <div className="card-body">
    //               <div style={{ height: "25em" }}>
    //                 <LineChartComponent />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-lg-6 col-md-12 col-sm-12 col-12 order-1 mb-4">
    //           <div className="card">
    //             <div className="card-header d-flex align-items-center justify-content-between pb-0">
    //               <div className="card-title mb-0">
    //                 <h5 className="m-0 me-2">Net Sales Statistics</h5>
    //               </div>
    //             </div>
    //             <div className="card-body">
    //               <div style={{ height: "25em" }}>
    //                 <LineChartSales />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* ============ leaderboard ============ */}
    //   <Title>Leaderboard</Title>
    //   <div className="row gy-5 gx-xl-8">
    //     <div className="col-xl-6">
    //       <TopSellingProducts
    //         products={products}
    //         orders={orders}
    //         className="card-xxl-stretch mb-5 mb-xl-8"
    //       />
    //     </div>
    //     <div className="col-xl-6">
    //       <TopSellingCategories
    //         products={products}
    //         orders={orders}
    //         className="card-xxl-stretch mb-5 mb-xl-8"
    //       />
    //     </div>
    //   </div>
    //   {/* ============ recent ============ */}
    //   <Title>Tables</Title>
    //   <div className="row gy-5 gx-xl-8">
    //     <div className="col-xl-6">
    //       <TablesWidget5 className="card-xxl-stretch mb-5 mb-xl-8" />
    //     </div>
    //     <div className="col-xl-6">
    //       <TablesWidget7 orders={orders} className="card-xxl-stretch mb-5 mb-xl-8" />
    //     </div>
    //   </div>
    // </>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };

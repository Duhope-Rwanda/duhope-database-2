import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import { getCSSVariableValue } from '../../_powr/assets/ts/_utils';
import { WithChildren } from '../../_powr/helpers';
import { MasterLayout } from '../../_powr/layout/MasterLayout';
import CategoriesPage from '../modules/apps/categories/CategoriesPage';
import GroupsPage from '../modules/apps/groups/GroupsPage';
import ProductsGroupPage from '../modules/apps/groups/ProductsGroupPage';
import OrdersPage from '../modules/apps/orders/OrdersPage';
import OrderDetails from '../modules/apps/orders/orderDetails';
import AddProduct from '../modules/apps/products/AddProduct';
import ProductsPage from '../modules/apps/products/ProductsPage';
import EditProduct from '../modules/apps/products/editProduct';
import ProductDetails from '../modules/apps/products/productDetails';
import ProjectsPage from '../modules/apps/projects/ProjectsPage';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'));
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'));
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'));
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'));
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        {/* <Route path='builder' element={<BuilderPageWrapper />} /> */}
        {/* <Route path='menu-test' element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />

        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />

        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />

        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        <Route
          path="apps/categories/*"
          element={
            <SuspensedView>
              <CategoriesPage />
            </SuspensedView>
          }
        />

        <Route
          path="apps/groups/*"
          element={
            <SuspensedView>
              <GroupsPage />
            </SuspensedView>
          }
        />

        <Route
          path="apps/groups/:groupId/products"
          element={
            <SuspensedView>
              <ProductsGroupPage />
            </SuspensedView>
          }
        />

        <Route
          path="apps/orders/*"
          element={
            <SuspensedView>
              <OrdersPage />
            </SuspensedView>
          }
        />
        <Route path="apps/orders/:orderId" element={<OrderDetails />} />
        <Route
          path="apps/projects/*"
          element={
            <SuspensedView>
              <ProjectsPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/products"
          element={
            <SuspensedView>
              <ProductsPage />
            </SuspensedView>
          }
        />
        <Route path="apps/products/add" element={<AddProduct />} />
        <Route path="apps/products/:productId/edit" element={<EditProduct />} />
        <Route path="apps/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor
    },
    barThickness: 1,
    shadowBlur: 5
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };

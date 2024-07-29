import React from 'react';
import { Route, Routes } from 'react-router';
import AdminOrderPage from '../page/AdminOrderPage';
import AdminProduct from '../page/AdminProduct';
import CartPage from '../page/CartPage';
import Login from '../page/Login';
import MyPage from '../page/MyPage';
import OrderCompletePage from '../page/OrderCompletePage';
import PaymentPage from '../page/PaymentPage';
import ProductAll from '../page/ProductAll';
import ProductDetail from '../page/ProductDetail';
import RegisterPage from '../page/RegisterPage';
import PrivateRoute from './PrivateRoute';
import NoticePage from '../page/NoticePage';
import AdminNotice from '../page/AdminNotice';
import StatisticsPage from '../page/StatisticsPage';
import OrdersByDateChart from '../page/OrdersByDateChart';
import OrdersByDateTable from '../component/OrdersByDateTable';
import KakaoCallback from '../page/KakaoCallback';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductAll />} />
      <Route path="/:category" element={<ProductAll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/order-check" element={<OrdersByDateTable />} />
      <Route path="/kakao/callback" element={<KakaoCallback />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
        <Route path="/admin/notice" element={<AdminNotice />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

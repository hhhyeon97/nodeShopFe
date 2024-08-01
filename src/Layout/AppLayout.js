import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ToastMessage from '../component/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { commonUiActions } from '../action/commonUiAction';
import { cartActions } from '../action/cartAction';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // 기존 코드
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  // 시도 코드
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         // Test token validity
  //         await dispatch(userActions.loginWithToken()); // Verify token is still valid
  //       } catch (error) {
  //         // If token is invalid, attempt to refresh
  //         await dispatch(userActions.refreshToken());
  //       }
  //     } else {
  //       // No token found
  //       dispatch(userActions.logout());
  //     }
  //   };

  //   checkToken();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(cartActions.getCartQty());
  }, [user, dispatch]);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes('admin') ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;

import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderAction';
import OrderStatusCard from '../component/OrderStatusCard';
import '../style/orderStatus.style.css';
import { useNavigate } from 'react-router';
import { ColorRing } from 'react-loader-spinner';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userOrderList, loading } = useSelector((state) => state.order); // Redux store에서 주문 리스트 가져오기

  //오더리스트 들고오기
  useEffect(() => {
    // 페이지가 처음 렌더링될 때 주문 리스트를 가져오는 액션을 디스패치
    dispatch(orderActions.getOrder());
  }, [dispatch]);

  // console.log('주문정보', orderList);
  if (loading) {
    return (
      <div className="center-spinner">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#779fe0', '#6d7787', '#e1e6ed']}
        />
      </div>
    );
  }

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  if (!userOrderList.length) {
    return (
      <Container className="status-card-container locate-center mt-5">
        주문한 상품이 없습니다.
      </Container>
    );
  }

  return (
    <Container className="status-card-container">
      {userOrderList.map((order) => (
        <OrderStatusCard key={order.id} order={order} />
      ))}
    </Container>
  );
};

export default MyPage;

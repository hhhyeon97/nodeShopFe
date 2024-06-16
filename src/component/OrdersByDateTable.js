import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../action/orderAction';
import { formatKoreanDate } from '../utils/date';

const OrdersByDateTable = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(orderActions.fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (orders.length === 0) {
    return <div>No data available.</div>;
  }

  // 주문 건수 최대값 계산
  const maxCount = Math.max(...orders.map((item) => item.count));

  return (
    <div>
      {/* <h3 className="order-check-title">주문 집계</h3> */}
      <div className="orders-container">
        {orders.map((item, index) => (
          <div key={index} className="bar-container">
            <div
              className="bar"
              style={{ height: `${(item.count / maxCount) * 100}%` }}
            ></div>
            <div className="bar-label">{formatKoreanDate(item._id)}</div>
            <div className="bar-value">{item.count}건</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersByDateTable;

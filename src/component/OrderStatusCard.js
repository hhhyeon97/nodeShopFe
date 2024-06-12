import React, { useEffect } from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { badgeBg } from '../constants/order.constants';
import { currencyFormat } from '../utils/number';
import { useDispatch } from 'react-redux';
import { orderActions } from '../action/orderAction';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const OrderStatusCard = ({ order }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img
            src={order.items[0].productId.image}
            alt=""
            height={96}
            width={90}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {order.orderNum} </strong>
          </div>

          <div className="text-12">
            {' '}
            주문일자 : {formatDate(order.createdAt)}
          </div>
          <div className="text-12">
            주문 상품:&nbsp;
            {order.items.length > 0 ? (
              <span>
                {order.items[0].productId.name}
                {order.items.length > 1 && ` 외 ${order.items.length - 1}개`}
              </span>
            ) : (
              <span>상품이 없습니다</span>
            )}
          </div>
          {/* <div>{order.items.map((item) => item.productId.name).join(', ')}</div> */}
          <div className="total-price">
            총 결제금액 : {order.totalPrice.toLocaleString('ko-KR') + '원'}
          </div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">주문상태</div>
          <Badge bg="warning">{order.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;

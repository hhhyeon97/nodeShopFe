import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { badgeBg } from '../constants/order.constants';
import { currencyFormat } from '../utils/number';

const OrderStatusCard = ({ order }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={2}>
          <img src={order.items[0].productId.image} alt="" height={96} />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {order.orderNum} </strong>
          </div>

          <div className="text-12">날짜 {order.createdAt}</div>

          <div>리넨셔츠 외 1개</div>
          <div>{order.items.map((item) => item.productId.name).join(', ')}</div>
          <div>총 가격 {currencyFormat(order.totalPrice)}</div>
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

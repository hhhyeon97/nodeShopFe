import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { badgeBg } from '../constants/order.constants';
import { currencyFormat } from '../utils/number';

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
          <img src={order.items[0].productId.image} alt="" height={96} />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>주문번호: {order.orderNum} </strong>
          </div>

          <div className="text-12">
            {' '}
            주문일자 : {formatDate(order.createdAt)}
          </div>
          <div>
            {' '}
            주문 상품 :&nbsp;
            {order.items.map((item, index) => (
              <span key={item.productId._id}>
                {/* {item.productId.name} 포함 ({item.qty}개) */}
                {/* {item.productId.name}외 {item.qty - 1}개 */}
                {item.qty === 1 ? (
                  item.productId.name
                ) : (
                  <>
                    {item.productId.name} 외 {item.qty - 1}개
                  </>
                )}
                {index < order.items.length - 1 && ', '}
              </span>
            ))}
          </div>
          {/* <div>{order.items.map((item) => item.productId.name).join(', ')}</div> */}
          <div>총 가격 : {currencyFormat(order.totalPrice)}</div>
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

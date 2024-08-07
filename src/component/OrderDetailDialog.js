import React, { useState } from 'react';
import { Form, Modal, Button, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import '../style/adminOrder.style.css';
import { ORDER_STATUS } from '../constants/order.constants';
import { orderActions } from '../action/orderAction';
import { currencyFormat } from '../utils/number';

const OrderDetailDialog = ({
  open,
  handleClose,
  navigate,
  setSearchQuery,
  currentPage,
}) => {
  const selectedOrder = useSelector((state) => state.order.selectedOrder);
  const [orderStatus, setOrderStatus] = useState(selectedOrder.status);
  const dispatch = useDispatch();
  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const submitStatus = () => {
    dispatch(
      orderActions.updateOrder(
        selectedOrder._id,
        orderStatus,
        navigate,
        setSearchQuery,
        currentPage,
      ),
    );
    handleClose();
  };

  if (!selectedOrder) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>예약번호: {selectedOrder.orderNum}</p>
        <p>주문날짜: {selectedOrder.createdAt.slice(0, 10)}</p>
        <p>이메일: {selectedOrder.userId.email}</p>
        <p>
          주소:&nbsp;
          {selectedOrder.shipTo.address +
            ' ' +
            selectedOrder.shipTo.city +
            selectedOrder.shipTo.zip}
        </p>
        <p>
          연락처:&nbsp;
          {`${
            selectedOrder.contact.firstName + selectedOrder.contact.lastName
          } ${selectedOrder.contact.contact}`}
        </p>
        <p>주문내역</p>
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Name</th>
                <th>Unit Price</th>
                <th>Discount Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.length > 0 &&
                selectedOrder.items.map((item) => (
                  <tr key={item._id}>
                    {/* <td>{item._id}</td> */}
                    <td>{item.productId.name}</td>
                    <td>{item.price.toLocaleString('ko-KR') + '원'}</td>
                    <th>{(item.price / 2).toLocaleString('ko-KR') + '원'}</th>
                    <td>{item.qty}</td>
                    <td>
                      {((item.price * item.qty) / 2).toLocaleString('ko-KR') +
                        '원'}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={4}>총계:</td>
                <td>
                  {selectedOrder.totalPrice.toLocaleString('ko-KR') + '원'}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitStatus}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={orderStatus} onChange={handleStatusChange}>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="order-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="order-button"
            >
              닫기
            </Button>
            <button className="custom-btn" type="submit">
              저장
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderDetailDialog;

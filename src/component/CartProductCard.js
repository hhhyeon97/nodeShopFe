import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { cartActions } from '../action/cartAction';
import { currencyFormat } from '../utils/number';

const CartProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleQtyChange = (id, value) => {
    //아이템 수량을 수정한다
    dispatch(cartActions.updateQty(id, value));
  };

  const deleteCart = (id) => {
    //아이템을 지운다
    dispatch(cartActions.deleteCartItem(id));
  };

  return (
    <div className="product-card-cart">
      <Row>
        <Col md={2} xs={12}>
          <img
            src={item.productId.image}
            width={112}
            style={{ borderRadius: '5px' }}
          />
        </Col>
        <Col
          md={10}
          xs={12}
          className="cart-card-content"
          style={{ paddingLeft: '25px' }}
        >
          <div className="display-flex space-between">
            <h4 style={{ fontSize: '20px' }}>
              <strong>{item.productId.name}</strong>
            </h4>
            <button
              className="trash-button"
              style={{ border: 'none', background: 'none' }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                width={24}
                onClick={() => deleteCart(item._id)}
              />
            </button>
          </div>

          <div style={{ color: 'gray' }}>
            <strong>
              <span
                className="original-price"
                style={{ color: 'lightgray', marginRight: '5px' }}
              >
                {item.productId.price.toLocaleString('ko-KR') + '원'}
              </span>
              {(item.productId.price / 2).toLocaleString('ko-KR') + '원'}
            </strong>
          </div>
          <div>사이즈 {item.size.toUpperCase()} </div>
          <div>
            총 금액{' '}
            <strong>
              {((item.productId.price / 2) * item.qty).toLocaleString('ko-KR') +
                '원'}
            </strong>
          </div>
          <div>
            수량
            <Form.Control
              type="number"
              min="1"
              value={item.qty}
              onChange={(event) =>
                handleQtyChange(item._id, event.target.value)
              }
              className="qty-input"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartProductCard;

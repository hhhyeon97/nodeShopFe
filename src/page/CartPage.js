import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../action/cartAction';
import CartProductCard from '../component/CartProductCard';
import OrderReceipt from '../component/OrderReceipt';
import '../style/cart.style.css';
import { ColorRing } from 'react-loader-spinner';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   //카트리스트 불러오기
  //   dispatch(cartActions.getCartList());
  // }, []);

  useEffect(() => {
    //카트리스트 불러오기
    if (user) {
      dispatch(cartActions.getCartList());
    }
  }, [dispatch, user]);

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

  return (
    <Container className="mb-5">
      <Row>
        <Col xs={12} md={7}>
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <CartProductCard item={item} key={item._id} />
            ))
          ) : (
            <div
              className="text-align-center empty-bag"
              style={{ borderRadius: '5px' }}
            >
              <h4 style={{ color: 'gray' }}>카트가 비어있습니다.</h4>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;

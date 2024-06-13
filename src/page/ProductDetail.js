import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { ColorRing } from 'react-loader-spinner';
import { cartActions } from '../action/cartAction';
import { commonUiActions } from '../action/commonUiAction';
import { currencyFormat } from '../utils/number';
import '../style/productDetail.style.css';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  // console.log('please....', selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const [size, setSize] = useState('');
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (size === '') {
      setSizeError(true);
      return;
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    // if (!user) {
    //   alert('로그인 후 이용 가능합니다 !');
    //   navigate('/login');
    // }
    // 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size }));
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
    // console.log('value', value);
    if (sizeError) setSizeError(false);
    setSize(value);
  };

  //카트에러가 있으면 에러메세지 보여주기

  // useEffect(() => {
  //   //상품 디테일 정보 가져오기
  //   console.log('id', id);
  //   dispatch(productActions.getProductDetail(id));
  //   console.log('id', id);
  // }, [id]);

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [dispatch, id]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  // console.log('umm', selectedProduct);
  // console.log('Selected Product Stock:', selectedProduct.stock);

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">
            {selectedProduct.price.toLocaleString() + '원'}
          </div>
          <div className="product-info">{selectedProduct.description}</div>
          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={selectSize}
          >
            <Dropdown.Toggle
              className="dropdown-toggle-custom"
              style={{ border: '2px solid #333', width: '100%' }}
              variant="white"
              id="dropdown-basic"
            >
              {size || '사이즈 선택'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((item) => {
                  const stock = selectedProduct.stock[item];
                  return (
                    <Dropdown.Item
                      eventKey={item}
                      key={item}
                      disabled={stock <= 0}
                    >
                      {item.toUpperCase()}
                      {stock <= 0 ? (
                        ' (품절)'
                      ) : stock <= 5 ? (
                        <span style={{ color: 'red' }}>
                          {' '}
                          (품절임박·잔여 {stock}개)
                        </span>
                      ) : null}
                    </Dropdown.Item>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && '사이즈를 선택해주세요.'}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

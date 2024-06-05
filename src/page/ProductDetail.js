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

  const navigate = useNavigate();

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    // 아직 로그인을 안한유저라면 로그인페이지로
    // 카트에 아이템 추가하기
  };
  const selectSize = (value) => {
    // 사이즈 추가하기
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
    return <div>loading....</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  console.log('몽미', selectedProduct);

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img src={selectedProduct.image} className="w-100" alt="image" />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{selectedProduct.name}</div>
          <div className="product-info">
            ₩ {currencyFormat(selectedProduct.price)}
          </div>
          <div className="product-info">{selectedProduct.description}</div>
          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Menu className="size-drop-down">
              {Object.keys(selectedProduct.stock).length > 0 &&
                Object.keys(selectedProduct.stock).map((item) =>
                  selectedProduct?.stock[item] > 0 ? (
                    <Dropdown.Item eventKey={item}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item eventKey={item} disabled={true}>
                      {item.toUpperCase()}
                    </Dropdown.Item>
                  ),
                )}
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

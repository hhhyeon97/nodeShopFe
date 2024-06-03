import React, { useEffect } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';

const ProductAll = () => {
  const dispatch = useDispatch();
  // const error = useSelector((state) => state.product.error);
  const { productList } = useSelector((state) => state.product);

  // 처음 로딩하면 상품리스트 불러오기
  useEffect(() => {
    dispatch(productActions.getProductList());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {productList.map((product) => (
          <Col key={product._id} md={3} sm={12}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;

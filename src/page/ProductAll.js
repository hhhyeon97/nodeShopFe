import React, { useEffect } from 'react';
import ProductCard from '../component/ProductCard';
import { Row, Col, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../action/productAction';
import { commonUiActions } from '../action/commonUiAction';
import { TextAlignment } from '@cloudinary/url-gen/qualifiers';
import { ColorRing } from 'react-loader-spinner';

const ProductAll = () => {
  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('name') || '';

  // 처음 로딩하면 상품리스트 불러오기
  useEffect(() => {
    dispatch(productActions.getProductList({ name: searchTerm }));
  }, [dispatch, searchTerm]);

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

  if (productList.length === 0) {
    return (
      <div className="no-result-message">
        "{searchTerm}"에 해당하는 상품이 없습니다.
      </div>
    );
  }

  return (
    <Container>
      {searchTerm && productList.length > 0 && (
        <div className="search-results-message">
          총 {productList.length} 개의 상품이 검색 되었습니다.
        </div>
      )}
      <Row>
        {productList.map((product) => (
          <Col key={product._id} md={3} sm={12} className="mt-3">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductAll;

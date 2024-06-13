import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  // 모든 사이즈의 재고가 0인 경우 확인
  const isSoldOut = Object.values(product.stock).every((stock) => stock === 0);

  return (
    <div
      className={`card ${isSoldOut ? 'sold-out' : ''}`}
      onClick={() => showProduct(product._id)}
    >
      <img src={product?.image} alt={product?.name} />
      {isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
      <div
        className="product-name"
        style={{ fontWeight: 'bold', color: '#302f30' }}
      >
        {product?.name}
      </div>
      <div className="product-price">
        {product?.price.toLocaleString('ko-KR') + '원'}
      </div>
    </div>
  );
};

export default ProductCard;

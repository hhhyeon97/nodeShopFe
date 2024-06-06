import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../utils/number';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img src={product?.image} alt={product?.name} width={220} height={330} />
      <div className="product-name">{product?.name}</div>
      <div className="product-price">
        {product?.price.toLocaleString('ko-KR') + '원'}
      </div>
    </div>
  );
};

export default ProductCard;

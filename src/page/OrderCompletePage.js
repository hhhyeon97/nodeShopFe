import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/paymentPage.style.css';
import JSConfetti from 'js-confetti';

const OrderCompletePage = () => {
  const { orderNum } = useSelector((state) => state.order);

  useEffect(() => {
    // 주문번호가 존재할 때만 컨페티 효과 적용하기
    if (orderNum !== '') {
      const jsConfetti = new JSConfetti();

      jsConfetti.addConfetti({
        // emojis: ['🤗', '🥨', '👕', '👖', '🧦'],
        emojiSize: 50,
        confettiNumber: 70,
      });
    }
  }, [orderNum]);

  //만약 주문번호가 없는상태로 이페이지에 왔다면
  // 다시 메인페이지로 돌아가기
  if (orderNum === '') {
    return (
      <Container className="confirmation-page">
        <h2>주문 실패</h2>
        <p>메인 페이지로 돌아가세요</p>
        <Link to={'/'}>메인 페이지로 돌아가기</Link>
      </Container>
    );
  }
  // console.log('주문번호', orderNum);
  return (
    <Container className="confirmation-page">
      <img
        src="/image/check.png"
        width={120}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>주문 완료</h2>
      <div>
        주문번호 : <strong>{orderNum}</strong>{' '}
      </div>
      <div>
        주문 내역 확인은 ORDER 에서 확인해주세요
        <div className="text-align-center">
          <Link to={'/account/purchase'}>내 주문 바로가기</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;

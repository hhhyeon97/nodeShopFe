import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userActions } from '../action/userAction';
import '../style/register.style.css';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [policyError, setPolicyError] = useState(false);
  const error = useSelector((state) => state.user.error);

  const register = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    // 비번 중복확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호 중복 확인이 일치하지 않습니다 !');
      return;
    }
    // 이용약관에 체크했는지 확인
    if (!policy) {
      setPolicyError(true);
      return;
    }
    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    setPasswordError('');
    setPasswordError(false);
    dispatch(userActions.registerUser({ name, email, password }, navigate));
    //성공후 로그인 페이지로 넘어가기
  };

  const handleChange = (event) => {
    // event.preventDefault();
    // 값을 읽어서 FormData에 넣어주기
    const { id, value, checked } = event.target;
    // console.log(id, checked);
    if (id === 'policy') {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(userActions.resetError()); // 언마운트 시 에러 리셋
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(userActions.resetError()); // 마운트 시 에러 리셋
  }, [dispatch]);

  return (
    <Container className="register-area mb-5">
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <button type="submit" className="custom-btn">
          회원가입
        </button>
      </Form>
    </Container>
  );
};

export default RegisterPage;

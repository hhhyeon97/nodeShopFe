import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { GoogleLogin } from '@react-oauth/google';

import '../style/login.style.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.user.error);

  // useEffect(() => {
  //   return () => {
  //     dispatch(userActions.resetError());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(userActions.resetError()); // 마운트 시 에러 리셋
  }, [dispatch]);

  const loginWithEmail = (event) => {
    event.preventDefault();
    //이메일,패스워드를 가지고 백엔드로 보내기
    dispatch(userActions.loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData) => {
    // 구글로 로그인 하기
    dispatch(userActions.loginWithGoogle(googleData.credential));
  };

  // 이미 로그인한 유저 로그인페이지 이동 방지
  if (user) {
    navigate('/');
  }
  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="예) mern@mern.com"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
              아직 계정이 없으세요? <Link to="/register">회원가입 하기</Link>{' '}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>- 간편 로그인 -</p>
            <div className="display-center">
              {/*
              1. 구글 로그인 버튼 가져오기
              2. Oauth로그인을 위해서 google api 사이트에 가입하고
              클라이언트키, 시크릿키 받아오기
              3. 로그인
              4. 백엔드에서 로그인하기
                토큰 값을 읽어와서 - > 유저 정보를 뽑아 내기
                  a. 이미 로그인을 한 적이 있는 유저 = > 로그인시키고 토큰값 주기
                  b. 처음 로그인 시도를 한 유저 = > 회원가입 먼저 - > 토큰값 주기
            */}
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;

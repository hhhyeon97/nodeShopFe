import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { GoogleLogin } from '@react-oauth/google';

import '../style/login.style.css';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialKakao from '../component/SocialKakao';
import RandomStringUtil from '../utils/RandomStringUtil';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.user.error);
  // Kakao API 관련
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakaoTokenUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  // naver api 관련
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

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

  // 카카오 로그인 액션에 카카오 데이터 보내기 !
  const handleKakaoLogin = async (kakaoData) => {
    dispatch(userActions.loginWithKakao(kakaoData));
  };

  // 카카오 로그인2 rest api 방식 시도
  const handleKakaoLogin2 = () => {
    window.location.href = kakaoTokenUrl;
  };
  // 네이버
  const handleNaverLogin = () => {
    const state = RandomStringUtil.generateRandomString(10);
    const naverTokenUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`;
    window.location.href = naverTokenUrl;
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     dispatch(userActions.loginWithToken());
  //   }
  // }, [dispatch]);

  // 이미 로그인한 유저 로그인페이지 이동 방지
  // if (user) {
  //   navigate('/');
  // }
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Container className="login-area mt-5 mb-5">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="예) fuzzy@naver.com"
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
            <button type="submit" className="custom-btn">
              로그인
            </button>
            <div>
              아직 계정이 없으세요? <Link to="/register">회원가입 하기</Link>{' '}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>- 간편 로그인 -</p>
            <div className="social-area">
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
              <SocialKakao
                onSuccess={handleKakaoLogin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              <button className="custom_kakao_btn" onClick={handleKakaoLogin2}>
                카카오 로그인2 rest api 방식
              </button>
              <button onClick={handleNaverLogin} className="custom_naver_btn">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Naver</title>
                  <path
                    fill="#03C75A"
                    d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;

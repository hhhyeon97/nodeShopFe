import api from '../utils/api';
import * as types from '../constants/user.constants';
import { CART_RESET } from '../constants/cart.constants';
import { ORDER_RESET } from '../constants/order.constants';
import { commonUiActions } from './commonUiAction';

// 리프레시 토큰을 사용하여 새로운 어세스토큰 요청
const refreshAccessToken = (navigate) => async (dispatch) => {
  try {
    dispatch({
      type: types.LOGIN_WITH_TOKEN_REQUEST,
    });
    console.log('please...........시도하자!');
    const response = await api.post(
      '/auth/refresh-token',
      {},
      { withCredentials: true },
    );
    const newAccessToken = response.data.accessToken;
    // 새로운 어세스토큰을 로컬스토리지에 저장
    localStorage.setItem('token', newAccessToken);
    // console.log('토큰로그인 성공하고싶다...', response.data);
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      // 새로운 어세스토큰을 payload로 전달
      payload: { token: newAccessToken, data: response.data },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    // 사용자에게 안내 메시지 표시
    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    dispatch(logout());
    navigate('/login');
  }
};

const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response = await api.post('/auth/login', { email, password });
      if (response.status !== 200) throw new Error(response.error);

      localStorage.setItem('token', response.data.accessToken);

      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAIL, payload: error.error });
    }
  };

const logout = () => async (dispatch) => {
  try {
    // 로그아웃 API 호출
    await api.post('/auth/logout');
    // user 정보 지우고
    dispatch({ type: types.LOGOUT });
    // localStorage에서 토큰 제거
    localStorage.removeItem('token');
    // 쿠키에서 리프레시 토큰 제거 -> 백엔드에서 프론트에서 처리 못하게 설정했으면 백에서만 가능?!
    // document.cookie =
    //   'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    // 로그아웃 하면 카트도 reset 처리
    dispatch({ type: CART_RESET });
    // 로그아웃 하면 개인오더페이지도 reset 처리
    dispatch({ type: ORDER_RESET });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    // console.log('너 좀 열어보자 !!!', response.data);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const loginWithKakao = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    const response = await api.post('/auth/kakao', { token });
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.KAKAO_LOGIN_FAIL,
      payload: error.error,
    });
  }
};

// !! 문제 있음
const loginWithKakao2 = (code) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    // 인가 코드를 백엔드로 전송
    const response = await api.get(`/auth/kakao/callback?code=${code}`);
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.KAKAO_LOGIN_FAIL,
      payload: error.error,
    });
  }
};
// !! 얘도 - > 콜백하는 카카오랑 네이버는 리프레시토큰 도입 후
// 작동이 달라짐...음 구글은 되는거 보니 콜백....된 친구들은
// 토큰만료 알림이 뜨게 됨... 콜백가면서 앱레이아웃에 있는
// 리프레시토큰검사 로직이 실행 - > 아직 로그인 전이니 만료 알림 뜨는 듯 ?!...
const loginWithNaver = (code, state) => async (dispatch) => {
  try {
    dispatch({ type: types.NAVER_LOGIN_REQUEST });
    // 네이버는 code, state를 보내주어야 함 !!
    const response = await api.get(
      `/auth/naver/callback?code=${code}&state=${state}`,
    );
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.accessToken);

    dispatch({ type: types.NAVER_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.NAVER_LOGIN_FAIL, payload: error.error });
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post('/user', { email, name, password });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUiActions.showToastMessage(
          '회원가입을 완료 하였습니다!',
          'success',
        ),
      );
      // dispatch({ type: types.RESET_ERROR }); // 에러 상태 초기화
      navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };

export const resetError = () => ({
  type: types.RESET_ERROR,
});

export const userActions = {
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  resetError,
  loginWithKakao,
  loginWithKakao2,
  loginWithNaver,
  refreshAccessToken,
};

import api from '../utils/api';
import * as types from '../constants/user.constants';
import { CART_RESET } from '../constants/cart.constants';
import { ORDER_RESET } from '../constants/order.constants';
import { commonUiActions } from './commonUiAction';

// const loginWithToken = () => async (dispatch) => {
//   try {
//     dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
//     const response = await api.get('/user/me');
//     if (response.status !== 200) throw new Error(response.error);
//     console.log('rrr', response);
//     dispatch({
//       type: types.LOGIN_WITH_TOKEN_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
//     dispatch(logout());
//   }
// };

// const loginWithEmail =
//   ({ email, password }) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: types.LOGIN_REQUEST });
//       const response = await api.post('/auth/login', { email, password });
//       if (response.status !== 200) throw new Error(response.error);
//       localStorage.setItem('token', response.data.token);
//       dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: types.LOGIN_FAIL, payload: error.error });
//     }
//   };

// const loginWithToken = () => async (dispatch) => {
//   try {
//     dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
//     const response = await api.get('/user/me');
//     if (response.status !== 200) throw new Error(response.error);
//     console.log('rrr', response);
//     dispatch({
//       type: types.LOGIN_WITH_TOKEN_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
//     dispatch(logout());
//   }
// };

// const loginWithEmail =
//   ({ email, password }) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: types.LOGIN_REQUEST });
//       const response = await api.post('/auth/login', { email, password });
//       if (response.status !== 200) throw new Error(response.error);

//       localStorage.setItem('token', response.data.accessToken);
//       // 리프레시 토큰은 쿠키에 저장되므로 로컬스토리지에는 저장하지 않습니다.

//       dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: types.LOGIN_FAIL, payload: error.error });
//     }
//   };

// 리프레시 토큰을 사용하여 새로운 어세스토큰을 요청하는 액션
const refreshAccessToken = () => async (dispatch) => {
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
    console.log('토큰로그인 성공하고싶다...', response.data);
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: { token: newAccessToken, data: response.data },
      // 새로운 어세스토큰을 payload로 전달
    });

    // return newAccessToken; // 새로운 어세스토큰을 반환
  } catch (error) {
    console.error('Refresh token error:', error);
    dispatch({ type: types.LOGIN_FAIL });
    dispatch(logout()); // 로그아웃 처리
    throw error; // 에러를 다시 throw
  }
};

// 기존 로그인 함수 수정 (토큰 만료 시 리프레시 토큰 요청)
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

// 어세스토큰 자동 갱신 처리
const autoRefreshToken = () => async (dispatch) => {
  try {
    console.log('하이이이이이이이이이이이제발');
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me');
    if (response.status !== 200) {
      // 토큰 만료 시 새로운 어세스토큰 요청
      await dispatch(refreshAccessToken());
    }
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    console.error('Auto-refresh token error:', error);
    dispatch(logout()); // 오류 발생 시 로그아웃 처리
  }
};

const logout = () => async (dispatch) => {
  // user 정보 지우고
  dispatch({ type: types.LOGOUT });
  // localStorage에서 토큰 제거
  localStorage.removeItem('token');

  // 쿠키에서 리프레시 토큰 제거
  document.cookie =
    'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

  // 로그아웃 하면 카트도 reset 처리
  dispatch({ type: CART_RESET });
  // 로그아웃 하면 개인오더페이지도 reset 처리
  dispatch({ type: ORDER_RESET });
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token); // localStorage로 변경
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const loginWithKakao = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    console.log('test 1');
    const response = await api.post('/auth/kakao', { token });
    console.log('test 2');
    if (response.status !== 200) throw new Error(response.error);
    console.log('test 3');
    localStorage.setItem('token', response.data.token);
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: types.KAKAO_LOGIN_FAIL,
      payload: error.error,
    });
  }
};

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

const loginWithNaver = (code, state) => async (dispatch) => {
  try {
    dispatch({ type: types.NAVER_LOGIN_REQUEST });
    // 네이버는 code, state를 보내주어야 함 !!
    const response = await api.get(
      `/auth/naver/callback?code=${code}&state=${state}`,
    );
    if (response.status !== 200) throw new Error(response.error);
    localStorage.setItem('token', response.data.token);
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
  // loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  resetError,
  loginWithKakao,
  loginWithKakao2,
  loginWithNaver,
  autoRefreshToken,
  refreshAccessToken,
};

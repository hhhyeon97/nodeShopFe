import api from '../utils/api';
import * as types from '../constants/user.constants';
import { CART_RESET } from '../constants/cart.constants';
import { commonUiActions } from './commonUiAction';
import * as commonTypes from '../constants/commonUI.constants';
const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me');
    if (response.status !== 200) throw new Error(response.error);
    // console.log('rrr', response);
    dispatch({
      type: types.LOGIN_WITH_TOKEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
    dispatch(logout());
  }
};
const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });
      const response = await api.post('/auth/login', { email, password });
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem('token', response.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.LOGIN_FAIL, payload: error.error });
    }
  };
const logout = () => async (dispatch) => {
  // user 정보 지우고
  dispatch({ type: types.LOGOUT });
  // 세션 토큰 값도 지우자
  sessionStorage.removeItem('token');
  // 로그아웃 하면 카트도 reset 처리
  dispatch({ type: CART_RESET });
  // 로그아웃 하면 개인오더페이지도 reset 처리
  // dispatch({type: ORDER_RESET});
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    if (response.status !== 200) throw new Error(response.error);
    sessionStorage.setItem('token', response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
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
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
  resetError,
};

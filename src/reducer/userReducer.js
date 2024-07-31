import * as types from '../constants/user.constants';
const initialState = {
  loading: false,
  user: null,
  error: '',
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
    case types.KAKAO_LOGIN_REQUEST:
    case types.NAVER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
    case types.KAKAO_LOGIN_SUCCESS:
    case types.NAVER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload.user };
    case types.LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
    case types.KAKAO_LOGIN_FAIL:
    case types.NAVER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case types.LOGIN_WITH_TOKEN_FAIL:
      return { ...state, loading: false };
    case types.RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    case types.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default userReducer;

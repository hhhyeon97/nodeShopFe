import * as types from '../constants/notice.constants';
const initialState = {
  loading: false,
  error: '',
  noticeList: [],
};

function noticeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_NOTICE_REQUEST:
    case types.GET_NOTICE_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_NOTICE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.GET_NOTICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        noticeList: payload.data,
      };
    case types.CREATE_NOTICE_FAIL:
    case types.GET_NOTICE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default noticeReducer;

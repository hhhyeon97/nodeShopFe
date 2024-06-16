import * as types from '../constants/order.constants';

const initialState = {
  loading: false,
  error: '',
  orderNum: '',
  orderList: [],
  totalPageNum: 1,
  selectedOrder: {},
  userOrderList: [],
  orders: [],
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNum: payload };
    case types.GET_ORDER_SUCCESS:
      return { ...state, loading: false, userOrderList: payload.response.data };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false };
    case types.CREATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
    case types.UPDATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_SELECTED_ORDER:
      return { ...state, selectedOrder: payload };
    case types.ORDER_RESET:
      return { userOrderList: [] };
    //============================
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        loading: false,
        error: '',
      };
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        orders: [],
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
export default orderReducer;

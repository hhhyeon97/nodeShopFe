import api from '../utils/api';
import * as types from '../constants/order.constants';
import { cartActions } from './cartAction';
import { commonUiActions } from './commonUiAction';

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const response = await api.post('/order', payload);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: response.data.orderNum,
    });
    dispatch(cartActions.getCartQty());
    navigate('/payment/success');
  } catch (error) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getOrder = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const response = await api.get('/order'); // 이 부분은 프론트엔드에서 현재 유저의 ID를 전송해야 합니다.
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.message });
  }
};

// const getOrderList = (query) => async (dispatch) => {
//   try {
//     dispatch({ type: types.GET_ORDER_LIST_REQUEST });
//     const response = await api.get('/order', { params: query }); // query는 페이지 번호 등을 담고 있어야 합니다.
//     dispatch({
//       type: types.GET_ORDER_LIST_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.message });
//   }
// };

const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};

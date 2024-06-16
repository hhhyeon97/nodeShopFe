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
    const response = await api.get('/order');
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_FAIL, payload: error.message });
  }
};

const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });
    const response = await api.get('/order/list', {
      params: { ...query },
    });
    // console.log('rrr', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: error.error });
  }
};

const updateOrder =
  (id, status, navigate, setSearchQuery, currentPage) => async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_ORDER_REQUEST });
      const response = await api.put(`/order/${id}`, { status });
      if (response.status !== 200) throw new Error(response.error);
      dispatch({
        type: types.UPDATE_ORDER_SUCCESS,
        payload: response.data,
      });
      dispatch(
        commonUiActions.showToastMessage('오더 업데이트 완료!', 'success'),
      );
      dispatch(getOrderList({ page: currentPage }));
      setSearchQuery({ page: currentPage });
      navigate(`?page=${currentPage}`);
      // setSearchQuery({ page: 1 });
      // navigate('?page=1');
      dispatch(getOrder());
    } catch (error) {
      dispatch({ type: types.UPDATE_ORDER_FAIL, error: error });
      dispatch(commonUiActions.showToastMessage(error, 'error'));
    }
  };

export const resetOrder = () => ({
  type: types.ORDER_RESET,
});

const fetchOrders = () => async (dispatch) => {
  try {
    const response = await api.get('/order/orders-by-date');
    dispatch({
      type: types.FETCH_ORDERS_SUCCESS,
      payload: response.data.data.ordersByDate,
    });
    console.log('test', response);
  } catch (error) {
    dispatch({ type: types.FETCH_ORDERS_FAILURE, error: error });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
  fetchOrders,
};

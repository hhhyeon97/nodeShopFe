import api from '../utils/api';
import * as types from '../constants/cart.constants';
import { commonUiActions } from '../action/commonUiAction';
import { useNavigate } from 'react-router';
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.ADD_TO_CART_REQUEST });
      const response = await api.post('/cart', { productId: id, size, qty: 1 });
      // console.log('rrr', response);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({
        type: types.ADD_TO_CART_SUCCESS,
        payload: response.data.cartItemQty,
      });
      dispatch(
        commonUiActions.showToastMessage(
          '카트에 상품이 추가됐습니다 !',
          'success',
        ),
      );
      dispatch(cartActions.getCartQty()); // 수량 갱신
    } catch (error) {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.message });
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    // console.log('Fetching cart list');
    const response = await api.get('/cart');
    // console.log('Response from get cart API:', response);
    if (response.status !== 200) {
      // console.error('Error in get cart response:', response.error);
      throw new Error(response.error);
    }
    dispatch({
      type: types.GET_CART_LIST_SUCCESS,
      payload: response.data.data,
    });
    // console.log('Cart list fetched successfully');
  } catch (error) {
    // console.error('Error during fetching cart list:', error);
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error });
  }
};

const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    // console.log(`Deleting cart item with id: ${id}`);
    const response = await api.delete(`/cart/${id}`);
    // console.log('Response from delete API:', response);

    if (response.status !== 200) {
      // console.error('Error in delete response:', response.error);
      throw new Error(response.error);
    }
    dispatch({
      type: types.DELETE_CART_ITEM_SUCCESS,
      payload: response.data.cartItemQty,
    });
    // console.log('Delete success, fetching updated cart list');
    dispatch(getCartList());
    // console.log('getCartList dispatched');
    dispatch(cartActions.getCartQty()); // 수량 갱신
  } catch (error) {
    // console.error('Error during cart item deletion:', error);
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, 'error'));
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
    const response = await api.put(`/cart/${id}`, { qty: value });
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.UPDATE_CART_ITEM_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, 'error'));
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const response = await api.get('/cart/qty');
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error, 'error'));
  }
};

export const resetCart = () => ({
  type: types.CART_RESET,
});

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
  resetCart,
};

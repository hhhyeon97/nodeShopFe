import api from '../utils/api';
import * as types from '../constants/product.constants';
import { toast } from 'react-toastify';
import { commonUiActions } from './commonUiAction';

const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });
    const response = await api.get('/product', {
      params: { ...query },
    });
    // console.log('rrr', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: response.data });
    // console.log('response', response.data.data);
  } catch (error) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: error.error });
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/product/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.GET_PRODUCT_DETAIL_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams;
};

const createProduct =
  (formData, navigate, setSearchQuery) => async (dispatch, getState) => {
    try {
      dispatch({ type: types.PRODUCT_CREATE_REQUEST });
      const response = await api.post('/product', formData);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
      dispatch(commonUiActions.showToastMessage('상품 생성 완료', 'success'));
      const { totalPageNum } = response.data;
      dispatch(getProductList({ page: totalPageNum, name: '' }));
      // console.log('total page', totalPageNum);
      // setSearchQuery({ page: totalPageNum, name: '' }); //todo 왜....url이랑페이지네이션 안 바뀔까 ?!...그리고 주석 풀면 토스트가 안 나오는 이유가 뭘까
      // navigate(`?page=${totalPageNum}`);
    } catch (error) {
      dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: error.error });
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
    }
  };
const deleteProduct = (id, navigate, setSearchQuery) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const response = await api.delete(`/product/${id}`);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({
      type: types.PRODUCT_DELETE_SUCCESS,
    });
    dispatch(commonUiActions.showToastMessage('상품 삭제 완료', 'success'));
    dispatch(getProductList({ page: 1 }));
    setSearchQuery({ page: 1, name: '' });
    navigate('?page=1');
  } catch (error) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const editProduct =
  (formData, id, navigate, setSearchQuery) => async (dispatch) => {
    try {
      dispatch({ type: types.PRODUCT_EDIT_REQUEST });
      const response = await api.put(`/product/${id}`, formData);
      // console.log('API response:', response);
      if (response.status !== 200) throw new Error(response.error);
      dispatch({
        type: types.PRODUCT_EDIT_SUCCESS,
        payload: response.data.data,
      });
      // console.log('Product edit success:', response.data.data);
      dispatch(commonUiActions.showToastMessage('상품 수정 완료', 'success'));
      dispatch(getProductList({ page: 1, name: '' }));
      setSearchQuery({ page: 1, name: '' });
      navigate('?page=1');
    } catch (error) {
      dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: error.error });
      dispatch(commonUiActions.showToastMessage(error.error, 'error'));
    }
  };

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};

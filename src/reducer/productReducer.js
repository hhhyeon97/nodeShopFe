import * as types from '../constants/product.constants';
const initialState = {
  loading: false,
  error: '',
  productList: [],
  totalPageNum: 1,
  selectedProduct: null,
  stats: null,
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
    case types.PRODUCT_EDIT_REQUEST:
    case types.GET_PRODUCT_DETAIL_REQUEST:
    case types.PRODUCT_STATS_REQUEST:
      return { ...state, loading: true };
    case types.PRODUCT_CREATE_SUCCESS:
    case types.PRODUCT_EDIT_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.PRODUCT_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        productList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: payload,
        error: '',
      };

    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
    case types.PRODUCT_EDIT_FAIL:
    case types.GET_PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, error: payload };

    case types.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: payload };

    case types.PRODUCT_STATS_SUCCESS:
      return { loading: false, stats: payload, error: null };
    case types.PRODUCT_STATS_FAIL:
      return { loading: false, stats: null, error: payload };
    default:
      return state;
  }
}

export default productReducer;

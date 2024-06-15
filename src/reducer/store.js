import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import commonUiReducer from './commonUIReducer';
import orderReducer from './orderReducer';
import noticeReducer from './noticeReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    ui: commonUiReducer,
    order: orderReducer,
    notice: noticeReducer,
  },
});
export default store;

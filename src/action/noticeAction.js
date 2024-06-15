import api from '../utils/api';
import * as types from '../constants/notice.constants';
import { toast } from 'react-toastify';
import { commonUiActions } from './commonUiAction';

const createNotice = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_NOTICE_REQUEST });
    const response = await api.post('/notice', formData);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.CREATE_NOTICE_SUCCESS });
    dispatch(commonUiActions.showToastMessage('공지사항 추가 완료', 'success'));
  } catch (error) {
    dispatch({ type: types.CREATE_NOTICE_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

const getNoticeList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_NOTICE_REQUEST });
    const response = await api.get('/notice', {});
    // console.log('rrr', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_NOTICE_SUCCESS, payload: response.data });
    // console.log('response', response.data.data);
  } catch (error) {
    dispatch({ type: types.GET_NOTICE_FAIL, payload: error.error });
  }
};

export const noticeActions = {
  createNotice,
  getNoticeList,
};

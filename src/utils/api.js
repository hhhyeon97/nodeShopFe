import axios from 'axios';
import { refreshToken } from '../action/userAction'; // 리프레시 토큰 로직 추가
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  // baseURL: `${BACKEND_PROXY}/api`,
  baseURL: LOCAL_BACKEND,
  // baseURL: `${PROD_BACKEND}/api`,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
/**
 * console.log all requests and responses
 */
// 기존 코드
// api.interceptors.request.use(
//   (request) => {
//     console.log('Starting Request', request);
//     request.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
//     return request;
//   },
//   function (error) {
//     console.log('REQUEST ERROR', error);
//   },
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     error = error.response.data;
//     console.log('RESPONSE ERROR', error);
//     return Promise.reject(error);
//   },
// );

// !! 업데이트

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken(); // 리프레시 토큰 호출
        localStorage.setItem('token', newAccessToken);
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 원래 요청을 재시도
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken'); // 리프레시 토큰도 제거
        // Redirect to login or handle logout
      }
    }
    return Promise.reject(error);
  },
);

export default api;

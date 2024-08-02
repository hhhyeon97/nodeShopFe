import axios from 'axios';
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  // baseURL: `${BACKEND_PROXY}/api`,
  // baseURL: `${PROD_BACKEND}/api`,
  baseURL: LOCAL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true, // 쿠키를 요청에 포함시키도록 설정
});

/**
 * console.log all requests and responses
 */

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

api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    console.log('REQUEST ERROR', error);
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
        const refreshResponse = await axios.post(
          `${LOCAL_BACKEND}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('token', newAccessToken);

        // Retry the original request with the new access token
        api.defaults.headers['authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log('REFRESH TOKEN ERROR', refreshError);
        // Logout or handle refresh token error
        // Example: dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default api;

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

api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    request.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

// ===================================

// /**
//  * 요청을 시작하기 전에 처리할 작업
//  */
// api.interceptors.request.use(
//   (request) => {
//     console.log('Starting Request', request);
//     // 요청 헤더에 어세스토큰을 추가합니다.
//     request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return request;
//   },
//   (error) => {
//     console.log('REQUEST ERROR', error);
//     return Promise.reject(error);
//   },
// );

// /**
//  * 응답을 받은 후 처리할 작업
//  */
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 인증 오류가 발생했을 때 (예: 어세스토큰 만료)
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         // 리프레시 토큰을 사용하여 새로운 어세스토큰을 요청합니다.
//         const refreshResponse = await axios.post(
//           `${LOCAL_BACKEND}/auth/refresh-token`,
//           {},
//           { withCredentials: true },
//         );
//         const newAccessToken = refreshResponse.data.accessToken;

//         // 새로운 어세스토큰을 로컬스토리지와 Axios 기본 헤더에 저장합니다.
//         localStorage.setItem('token', newAccessToken);
//         api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         // 원래의 요청을 새로운 어세스토큰으로 재시도합니다.
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.log('REFRESH TOKEN ERROR', refreshError);
//         // 리프레시 토큰 요청 실패 시 처리 (예: 로그아웃)
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default api;

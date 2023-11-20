import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.pinposh.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// let refreshingTokenPromise: Promise<any> | null = null;

// axiosInstance.interceptors.request.use(async (config) => {
//   const tokens = await TokenService.getTokens();
//   if (tokens && tokens.access) {
//     config.headers.Authorization = `Bearer ${tokens.access.token}`;
//   }

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     const customConfig = response.config as CustomAxiosRequestConfig;
//     if (customConfig._retry) {
//       delete customConfig._retry;
//     }
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (!refreshingTokenPromise) {
//           refreshingTokenPromise = api.auth.refreshTokens().finally(() => {
//             refreshingTokenPromise = null;
//           });
//         }

//         const { success } = await refreshingTokenPromise;

//         if (success) {
//           const refreshedTokens = await TokenService.getTokens();

//           if (refreshedTokens && refreshedTokens.access) {
//             axios.defaults.headers.common.Authorization = `Bearer ${refreshedTokens.access.token}`;
//             return axiosInstance(originalRequest);
//           }
//         }

//         useAuthStore.getState().logout();
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         return Promise.reject(error);
//       }
//     }

//     if (error.response?.status === 401 && originalRequest._retry) {
//       useAuthStore.getState().logout();

//       Toast.show({
//         type: 'info',
//         text1: 'Ве молиме најавете се повторно',
//       });

//       return Promise.reject(new Error('Unauthorized after token refresh.'));
//     }

//     return Promise.reject(error);
//   },
// );

export default axiosInstance;

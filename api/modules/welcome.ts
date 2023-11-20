import axiosInstance from '../config/AxiosInstance';

export const welcome = async () => {
  const response = await axiosInstance.get('/');
  return response.data.message;
};

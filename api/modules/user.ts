import axios from 'axios';

import useAuthStore from '../../stores/auth';
import axiosInstance from '../config/AxiosInstance';
import type { UpdateUser } from '../schemas/userSchema';
import AuthService from '../services/AuthService';
import type { User } from '../types/AuthTypes';

export const getUser = async () => {
  try {
    const response = await axiosInstance.get('/v1/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return undefined;
      }
    }
    throw error;
  }
};

export const updateUser = async (updatedUser: UpdateUser): Promise<User> => {
  const response = await axiosInstance.patch('/v1/users', updatedUser);
  if (response.status !== 200) {
    throw new Error('Failed to update user information');
  }
  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  const response = await axiosInstance.delete('/v1/users');

  if (response.status !== 204) {
    throw new Error('Failed to delete user');
  }

  await AuthService.clearUser();
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setTokens(null);
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { z, ZodError } from 'zod';

import useAuthStore from '../../stores/auth';
import axiosInstance from '../config/AxiosInstance';
import type {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  VerifyPhone,
} from '../schemas/authSchema';
import * as authSchema from '../schemas/authSchema';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';
import type { User } from '../types/AuthTypes';
import type { Tokens } from '../types/TokenTypes';

type CustomError = AxiosError | ZodError | Error;

const handleError = (
  error: CustomError | AxiosError | ZodError,
  defaultErrorMessage: string,
): string => {
  let message = defaultErrorMessage;

  if (error instanceof ZodError) {
    message = error.errors.map((err) => err.message).join(', ');
  } else if (axios.isAxiosError(error)) {
    if (error.response) {
      message =
        error.response.data.error || error.response.data.message || message;
    } else if (error.request) {
      message = 'No response was received';
    } else {
      message = error.message || message;
    }
  } else if ('message' in error) {
    message = error.message || message;
  }

  Toast.show({
    type: 'error',
    text1: 'Се случи грешка',
    text2: message,
  });

  return message;
};

export const register = async (
  userDetails: Register,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const validatedData = authSchema.register.parse(userDetails);
    const response = await axiosInstance.post(
      '/v1/auth/register',
      validatedData,
    );

    await AuthService.storeUserAndTokens(response.data);
    useAuthStore.getState().setUser(response.data.user);
    useAuthStore.getState().setTokens(response.data.tokens);
    useAuthStore.getState().setIsAuthenticated(true);

    await AsyncStorage.setItem('createdAccount', 'true');

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodErrorMessages = error.errors
        .map((err) => err.message)
        .join(', ');
      return {
        success: false,
        message: `Validation error: ${zodErrorMessages}`,
      };
    }

    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === 'User already exists'
      ) {
        Toast.show({
          type: 'info',
          text1: `Корисникот веќе постои. Логирај се.`,
        });
        return { success: false, message: 'User already exists' };
      }

      const message =
        error.response?.data?.error ||
        'Се случи грешка во нашиот систем. Ве молиме пробајте повторно.';
      return { success: false, message };
    }

    return {
      success: false,
      message: 'Се случи грешка во нашиот систем. Ве молиме пробајте повторно.',
    };
  }
};

export const login = async (
  credentials: Login,
): Promise<{
  success: boolean;
  user?: User;
  tokens?: Tokens;
  message?: string;
}> => {
  try {
    const validatedData = authSchema.login.parse(credentials);
    const response = await axiosInstance.post('/v1/auth/login', validatedData);

    await AuthService.storeUserAndTokens(response.data);
    useAuthStore.getState().setUser(response.data.user);
    useAuthStore.getState().setTokens(response.data.tokens);
    useAuthStore.getState().setIsAuthenticated(true);

    return { success: true };
  } catch (error) {
    const message = handleError(error as any, 'Се случи грешка при најава');
    return {
      success: false,
      message,
    };
  }
};

export const refreshTokens = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const isValid = await TokenService.verifyRefreshToken();
    if (!isValid) {
      throw new Error('Refresh token is not valid.');
    }

    const tokens = await TokenService.getTokens();
    if (!tokens || !tokens.refresh) {
      throw new Error('No refresh token available.');
    }

    const refreshToken: string = tokens.refresh.token;
    const validatedData = authSchema.refreshTokens.parse({
      refresh_token: refreshToken,
    });

    const response = await axiosInstance.post(
      '/v1/auth/refresh-tokens',
      validatedData,
    );

    await TokenService.storeTokens(response.data);

    return { success: true };
  } catch (error) {
    const message = handleError(
      error as any,
      'Се случи грешка при освежување на токените',
    );
    return {
      success: false,
      message: `${message}`,
    };
  }
};

export const forgotPassword = async (
  forgotDetails: ForgotPassword,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const validatedData = authSchema.forgotPassword.parse(forgotDetails);
    const response = await axiosInstance.post(
      '/v1/auth/forgot-password',
      validatedData,
    );
    const resetPasswordToken = response.data.resetPassword.token;

    await AuthService.storeResetPasswordToken(resetPasswordToken);

    return {
      success: true,
    };
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: `Се случи грешка при промена на лозинката.`,
      text2: `${error}`,
    });
    return {
      success: false,
      message:
        'Неуспевме да го започнеме процесот на промена на лозинката. Имаше грешка во нашиот систем.',
    };
  }
};

export const resetPassword = async (
  resetDetails: ResetPassword,
): Promise<{ success: boolean; message?: string }> => {
  const validatedData = authSchema.resetPassword.parse(resetDetails);

  const accessToken = await SecureStore.getItemAsync('access_token');
  const forgotPasswordToken = await SecureStore.getItemAsync(
    'reset_password_token',
  );

  const token = accessToken || forgotPasswordToken;

  if (!token) {
    Toast.show({
      type: 'error',
      text1: `Не пронајдовме валиден сертификат за промена на лозинката'`,
    });
    throw new Error(
      'Не пронајдовме валиден сертификат за промена на лозинката',
    );
  }

  const url = `/v1/auth/reset-password?token=${encodeURIComponent(token)}`;

  const response = await axiosInstance.post(url, validatedData);

  if (response.status === 204) {
    return { success: true };
  }
  Toast.show({
    type: 'error',
    text1: `Не можевме да го ресетираме вашата лозинка.'`,
  });
  return {
    success: false,
    message: 'Не можевме да го ресетираме вашата лозинка.',
  };
};

export const sendOTP = async (
  phoneNumber: VerifyPhone,
): Promise<{ success: boolean; message?: string }> => {
  const validatedData = authSchema.verifyForgotPasswordPhone.parse({
    phoneNumber,
  });
  const response = await axiosInstance.post('/v1/auth/send', validatedData);

  if (response.status === 204) {
    return { success: true };
  }
  Toast.show({
    type: 'error',
    text1: `Не можевме да ви испратиме СМС Код.'`,
  });
  return {
    success: false,
    message: 'Не можевме да ви испратиме СМС Код.',
  };
};

export const verifyPhoneNumber = async (
  verificationDetails: ForgotPassword,
): Promise<{ success: boolean; message?: string }> => {
  const validatedData =
    authSchema.verifyForgotPasswordPhone.parse(verificationDetails);
  const response = await axiosInstance.post(
    '/v1/auth/verify-phone',
    validatedData,
  );

  if (response.status === 204) {
    return { success: true };
  }
  Toast.show({
    type: 'error',
    text1: `Не можевме да го верифицираме вашиот број.'`,
  });
  return {
    success: false,
    message: 'Не можевме да го верифицираме вашиот број.',
  };
};

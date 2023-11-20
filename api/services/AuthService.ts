import * as SecureStore from 'expo-secure-store';

import type { ResponseBody, User } from '../types/AuthTypes';
import TokenService from './TokenService';

class AuthService {
  static async storeUser(userData: User) {
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
  }

  static async getUser(): Promise<User | null> {
    const user = await SecureStore.getItemAsync('user');
    return user ? JSON.parse(user) : null;
  }

  static async clearUser() {
    await SecureStore.deleteItemAsync('user');
  }

  static async storeCredentials(email: string, password: string) {
    const credentials = {
      email,
      password,
    };
    await SecureStore.setItemAsync('creds', JSON.stringify(credentials));
  }

  static async getCredentials(): Promise<{
    email: string;
    password: string;
  } | null> {
    const creds = await SecureStore.getItemAsync('creds');
    return creds ? JSON.parse(creds) : null;
  }

  static async clearCredentials() {
    await SecureStore.deleteItemAsync('creds');
  }

  static async storeResetPasswordToken(token: string) {
    await SecureStore.setItemAsync('reset_password_token', token);
  }

  static async getResetPasswordToken() {
    return SecureStore.getItemAsync('reset_password_token');
  }

  static async clearResetPasswordToken() {
    await SecureStore.deleteItemAsync('reset_password_token');
  }

  static async storeUserAndTokens(responseBody: ResponseBody) {
    const { user, tokens } = responseBody;

    if (user) {
      await AuthService.storeUser(user);
    }

    if (tokens) {
      await TokenService.storeTokens(tokens);
    }
  }
}

export default AuthService;

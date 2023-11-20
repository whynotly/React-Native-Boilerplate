import * as SecureStore from 'expo-secure-store';

import type { Tokens } from '../types/TokenTypes';

class TokenService {
  static async storeTokens(tokens: Tokens) {
    await SecureStore.setItemAsync(
      'access_token',
      JSON.stringify(tokens.access),
    );
    await SecureStore.setItemAsync(
      'refresh_token',
      JSON.stringify(tokens.refresh),
    );
  }

  static async getTokens(): Promise<Tokens | null> {
    const access = await SecureStore.getItemAsync('access_token');
    const refresh = await SecureStore.getItemAsync('refresh_token');

    if (access && refresh) {
      return {
        access: JSON.parse(access),
        refresh: JSON.parse(refresh),
      };
    }

    return null;
  }

  static async clearTokens() {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
  }

  static async verifyRefreshToken() {
    try {
      const { refresh } = (await TokenService.getTokens()) || { refresh: null };
      if (!refresh) {
        return false;
      }

      const expiration = new Date(refresh.expires);
      const now = new Date();

      if (expiration <= now) {
        throw new Error('Refresh token has expired.');
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  static async verifyAccessToken() {
    try {
      const { access } = (await TokenService.getTokens()) || { access: null };
      if (access === null) {
        return false;
      }

      const expiration = new Date(access.expires);
      const now = new Date();

      if (expiration <= now) {
        throw new Error('Access token has expired.');
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default TokenService;

import { create } from 'zustand';

import { api } from '../api/Index';
import AuthService from '../api/services/AuthService';
import TokenService from '../api/services/TokenService';
import type { User } from '../api/types/AuthTypes';
import type { Tokens } from '../api/types/TokenTypes';
import useAppStore from './app';

export interface AuthStoreState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean | null;
  setUser: (user: User | null) => void;
  setTokens: (tokens: Tokens | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean | null) => void;
  getUserAndTokens: () => Promise<void>;
  logout: () => Promise<void>;
}

let refreshTokensPromise: Promise<boolean> | null = null;

const refreshTokenHandler = async (): Promise<boolean> => {
  return api.auth
    .refreshTokens()
    .then((response) => {
      if (!response.success) {
        throw new Error('Failed to refresh access token.');
      }
      return true;
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      refreshTokensPromise = null;
    });
};

const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: null,

  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  getUserAndTokens: async () => {
    const { setLoading } = useAppStore.getState();
    setLoading(true);

    try {
      let tokens = await TokenService.getTokens();
      if (!tokens) {
        get().setIsAuthenticated(false);
      }

      const isAccessTokenValid = await TokenService.verifyAccessToken();
      if (!isAccessTokenValid) {
        if (!refreshTokensPromise) {
          refreshTokensPromise = refreshTokenHandler();
        }
        const refreshSuccess = await refreshTokensPromise;

        if (refreshSuccess) {
          tokens = await TokenService.getTokens();
          get().setTokens(tokens);
        } else {
          get().setIsAuthenticated(false);
        }
      }

      const user = await AuthService.getUser();
      get().setUser(user);
      get().setIsAuthenticated(true);
    } catch (error) {
      await AuthService.clearUser();
      await TokenService.clearTokens();
      get().setUser(null);
      get().setTokens(null);
      get().setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  },

  logout: async () => {
    const { setLoading } = useAppStore.getState();
    setLoading(true);

    try {
      await AuthService.clearUser();
      await TokenService.clearTokens();

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
      });
    } catch (error) {
      throw new Error('Failed to logout');
    } finally {
      setLoading(false);
    }
  },
}));

export default useAuthStore;

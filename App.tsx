import 'expo-dev-client';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import type React from 'react';
import { useEffect } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as Sentry from 'sentry-expo';

import { onAppStateChange } from './api/handlers/appStateHandler';
import { setupOfflineHandler } from './api/handlers/offlineHandler';
import Index from './navigation/Index';
import useAppStore from './stores/app';
import type { AuthStoreState } from './stores/auth';
import useAuthStore from './stores/auth';

interface AppStore {
  setOffline: (offline: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { getUserAndTokens, isAuthenticated } = useAuthStore(
    (state: AuthStoreState) => state,
  );
  const { setOffline, setLoading } = useAppStore((state: AppStore) => state);
  const sentryKey = Constants.expoConfig?.extra?.sentryKey;

  useEffect(() => {
    getUserAndTokens();
  }, [getUserAndTokens]);

  useEffect(() => {
    const handleAppStateChange = async (status: AppStateStatus) => {
      onAppStateChange(status);
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    setupOfflineHandler(setOffline);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const setupUser = async () => {
      if (isAuthenticated) {
        setLoading(false);
      }
    };

    setupUser();
  }, [isAuthenticated]);

  Sentry.init({
    dsn: sentryKey,
    enableInExpoDevelopment: false,
    debug: true,
    tracesSampleRate: 1.0,
    attachScreenshot: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Index />
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </QueryClientProvider>
  );
};

export default App;

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

let recheckConnection: (() => Promise<void>) | undefined;
let lastRecheckTime = 0;
const RECHECK_INTERVAL = 5000;

export const setupOfflineHandler = (setOffline: (value: boolean) => void) => {
  NetInfo.configure({
    reachabilityUrl: 'https://api.parkplus.mk',
    reachabilityTest: async (response) => response.status === 200,
    reachabilityLongTimeout: 60 * 1000,
    reachabilityShortTimeout: 5 * 1000,
    reachabilityRequestTimeout: 15 * 1000,
    reachabilityShouldRun: () => true,
    shouldFetchWiFiSSID: false,
    useNativeReachability: true,
  });

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      const isConnected = !!state.isConnected;
      setOnline(isConnected);
      setOffline(!isConnected);
    });
  });

  recheckConnection = async () => {
    const now = Date.now();
    if (now - lastRecheckTime < RECHECK_INTERVAL) {
      return;
    }

    lastRecheckTime = now;

    const state = await NetInfo.fetch();
    const isConnected = !!state.isConnected;
    setOffline(!isConnected);
  };
};

export const recheckOnlineStatus = () => {
  if (recheckConnection) {
    recheckConnection();
  }
};

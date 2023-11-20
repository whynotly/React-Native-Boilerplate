import { create } from 'zustand';

interface AppStoreState {
  theme: string;
  language: string;
  notificationsEnabled: boolean;
  locationEnabled: boolean;
  isLoading: boolean;
  offline: boolean;
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setLocationEnabled: (enabled: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setOffline: (value: boolean) => void;
}

const useAppStore = create<AppStoreState>((set) => ({
  theme: 'light',
  language: 'en',
  notificationsEnabled: true,
  locationEnabled: true,
  isLoading: false,
  offline: false,

  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setLocationEnabled: (enabled) => set({ locationEnabled: enabled }),
  setLoading: (isLoading) => set({ isLoading }),
  setOffline: (value) => set({ offline: value }),
}));

export default useAppStore;

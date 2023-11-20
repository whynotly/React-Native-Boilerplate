import { focusManager } from '@tanstack/react-query';
import type { AppStateStatus } from 'react-native';
import { Platform } from 'react-native';

export function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

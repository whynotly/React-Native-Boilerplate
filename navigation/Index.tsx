import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import Offline from '@/components/templates/Offline';
import Splash from '@/components/templates/Splash';

import useAppStore from '../stores/app';
import useAuthStore from '../stores/auth';
import Auth from './Auth';
import Main from './Main';

const Index = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isOffline = useAppStore((state) => state.offline);
  const isLoading = useAppStore((state) => state.isLoading);
  let content;

  if (isLoading) {
    content = <Splash isBlurred={false} />;
  } else if (isOffline) {
    content = <Offline />;
  } else if (!isAuthenticated) {
    content = <Auth />;
  } else {
    content = <Main />;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {content}
        <Toast topOffset={50} />
      </View>
    </NavigationContainer>
  );
};

export default Index;

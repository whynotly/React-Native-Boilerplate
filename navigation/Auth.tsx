import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import Splash from '@/components/templates/Splash';
import Intro from '@/pages/auth/Intro';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Welcome from '@/pages/auth/Welcome';
// import ForgotPassword from "@/pages/auth/ForgotPassword";

const Stack = createNativeStackNavigator();

const Auth = () => {
  const [initialRoute, setInitialRoute] = useState<string>('');

  const pages = [
    { name: 'Intro', component: Intro },
    { name: 'Welcome', component: Welcome },
    { name: 'Login', component: Login },
    { name: 'Register', component: Register },
    // { name: "ForgotPassword", component: ForgotPassword }
  ];

  useEffect(() => {
    const checkCreatedAccount = async () => {
      const createdAccount = await AsyncStorage.getItem('createdAccount');

      if (createdAccount === 'true') {
        setInitialRoute('Intro');
      } else {
        setInitialRoute('Welcome');
      }
    };

    checkCreatedAccount();
  }, []);

  if (initialRoute === '') {
    return <Splash isBlurred={false} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      {pages.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default Auth;

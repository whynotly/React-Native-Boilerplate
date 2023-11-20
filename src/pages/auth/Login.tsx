import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import type React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Email from '@/components/templates/Email';

import { api } from '../../../api/Index';
import Error from '../../components/templates/Error';
import Password from '../../components/templates/Password';
import Splash from '../../components/templates/Splash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

interface LoginProps {
  navigation: NavigationProp<ParamListBase>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [emailData, setEmailData] = useState<string>('');
  const [loading, setLoading] = useState(false);

  let stepContent;

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { success } = await api.auth.login({
        email,
        password,
      });
      if (!success) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  switch (activeStepIndex) {
    case 0:
      stepContent = (
        <Email
          navigation={navigation}
          customSubmitHandler={(email: string) => {
            setEmailData(email);
            setActiveStepIndex(1);
          }}
        />
      );
      break;
    case 1:
      stepContent = (
        <Password
          title="Внеси ја вашата лозинка"
          navigation={navigation}
          customSubmitHandler={(password: string) => {
            handleLogin(emailData, password);
          }}
        />
      );
      break;
    default:
      stepContent = <Error navigation={navigation} />;
  }

  return (
    <>
      <View style={styles.container}>{stepContent}</View>
      {loading && <Splash isBlurred />}
    </>
  );
};

export default Login;

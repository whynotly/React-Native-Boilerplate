import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import type { Register } from 'api/schemas/authSchema';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import { api } from '../../../api/Index';
import type { FormData } from '../../../stores/form';
import useFormStore from '../../../stores/form';
import Input from '../atoms/Input';
import BtnLink from '../atoms/Link';
import AuthHeader from '../organisms/AuthHeader';
import HideKeyboard from '../organisms/HideKeyboard';
import Splash from './Splash';

interface PasswordProps {
  navigation: NavigationProp<ParamListBase>;
  title?: string;
  description?: string;
  customSubmitHandler?: (formattedNumber: string) => void;
}

const Password: React.FC<PasswordProps> = ({
  navigation,
  customSubmitHandler,
}) => {
  const { setActiveStepIndex, setFormData, formData } = useFormStore();
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (password: string) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const data = { ...formData, password, role: 'user' } as Register;
      const { success, message } = await api.auth.register(data);
      if (success) {
        const keysToDelete: (keyof FormData)[] = [
          'name',
          'email',
          'password',
          'role',
        ];
        keysToDelete.forEach((key) => {
          setFormData((prevData) => {
            const updatedData = { ...prevData };
            delete updatedData[key];
            return updatedData;
          });
        });
        setActiveStepIndex(0);
      } else if (message === 'User already exists') {
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: `Проверете ги податоците дали се точни.`,
          text2: 'Регистрирањето беше неуспешно',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmission = async (values: { password: string }) => {
    if (values.password) {
      if (customSubmitHandler) {
        customSubmitHandler(values.password);
      } else {
        await handleRegistration(values.password);
      }
    } else {
      Toast.show({
        type: 'info',
        text1: 'You need to enter a password.',
      });
    }
  };

  const PasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  });

  const styles = StyleSheet.create({
    contentContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      paddingTop: 18,
    },
    label: {
      fontSize: 15,
      marginBottom: 10,
      color: '#0009',
    },
    footer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 50,
    },
    button: {
      backgroundColor: '#000',
      width: '100%',
      paddingVertical: 20,
      borderRadius: 30,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
    },
  });

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={PasswordSchema}
      onSubmit={handleSubmission}
      validateOnMount
      validateOnBlur
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <HideKeyboard>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 25,
              paddingTop: 50,
            }}
          >
            <StatusBar style="dark" />
            <AuthHeader
              title="Enter your password"
              desc=""
              navigation={navigation}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ height: '100%' }}
            >
              <View style={styles.contentContainer}>
                <View>
                  <Input
                    label="Password"
                    error={
                      errors.password && touched.password
                        ? errors.password
                        : undefined
                    }
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    autoFocus
                    value={values.password}
                  />
                  <BtnLink
                    text="Forgot password?"
                    onPress={() => {
                      navigation.navigate('ResetPassword');
                    }}
                    style={{ marginTop: 32 }}
                  />
                </View>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            {loading && <Splash isBlurred />}
          </View>
        </HideKeyboard>
      )}
    </Formik>
  );
};

export default Password;

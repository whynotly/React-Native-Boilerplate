import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import useFormStore from '../../../stores/form';
import Input from '../atoms/Input';
import AuthHeader from '../organisms/AuthHeader';
import HideKeyboard from '../organisms/HideKeyboard';

interface EmailProps {
  navigation: NavigationProp<ParamListBase>;
  customSubmitHandler?: (email: string) => void; // Added customSubmitHandler
}

const Email: React.FC<EmailProps> = ({ navigation, customSubmitHandler }) => {
  const { setActiveStepIndex, setFormData } = useFormStore();

  const handleSubmission = async (values: { email: string }) => {
    if (values.email) {
      if (customSubmitHandler) {
        customSubmitHandler(values.email);
      } else {
        // Default submission logic
        setFormData((prevData) => ({
          ...prevData,
          email: values.email,
        }));
        setActiveStepIndex(2);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter a valid email address to continue.',
      });
    }
  };

  const EmailSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
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
      initialValues={{ email: '' }}
      validationSchema={EmailSchema}
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
              title="Enter your email"
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
                    label="Email Address"
                    error={
                      errors.email && touched.email ? errors.email : undefined
                    }
                    placeholder="Email Address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoComplete="email"
                    value={values.email}
                    keyboardType="email-address"
                    autoFocus
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
          </View>
        </HideKeyboard>
      )}
    </Formik>
  );
};

export default Email;

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
import * as yup from 'yup';

import useFormStore from '../../../stores/form';
import Input from '../atoms/Input';
import BtnLink from '../atoms/Link';
import AuthHeader from '../organisms/AuthHeader';
import HideKeyboard from '../organisms/HideKeyboard';

interface NameProps {
  navigation: NavigationProp<ParamListBase>;
}

const Name: React.FC<NameProps> = ({ navigation }) => {
  const { setActiveStepIndex, setFormData } = useFormStore();

  const NameSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/(\w+\s\w+)/, 'Enter your full name,  not just your first name'),
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
      initialValues={{ name: '' }}
      validationSchema={NameSchema}
      onSubmit={(values) => {
        setFormData((prevData) => ({
          ...prevData,
          name: values.name,
        }));
        setActiveStepIndex(1);
      }}
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
              title="Enter your full name"
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
                    label="Name and surname"
                    error={
                      (errors.name && touched.name ? errors.name : null) ||
                      undefined
                    }
                    placeholder="Name and surname"
                    onChangeText={handleChange('name')}
                    autoCapitalize="words"
                    onBlur={handleBlur('name')}
                    autoComplete="name"
                    value={values.name}
                    autoFocus
                    secureTextEntry={false}
                  />
                  <BtnLink
                    text="You already have an account? Login"
                    onPress={() => {
                      navigation.navigate('Login');
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
          </View>
        </HideKeyboard>
      )}
    </Formik>
  );
};

export default Name;

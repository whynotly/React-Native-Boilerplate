import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import type React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

interface ErrorProps {
  navigation: NavigationProp<ParamListBase>;
}

const Error: React.FC<ErrorProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ова е малку незгодно</Text>
      <Text style={styles.message}>Се случи некоја грешка во процесот</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Пробај повторно</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;

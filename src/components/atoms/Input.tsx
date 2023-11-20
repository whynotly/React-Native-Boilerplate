import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: '#0009',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 52,
    borderColor: '#0004',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 17,
  },
  inputFocus: {
    borderColor: '#0009',
    borderWidth: 2,
  },
  error: {
    borderColor: 'red',
  },
  eyeIcon: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 7,
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    marginLeft: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  instructions: {
    color: '#0007',
    marginTop: 7.5,
    marginLeft: 0,
    fontSize: 15,
    lineHeight: 20,
  },
});

interface InstructionPart {
  text: string;
  bold?: boolean;
}

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  instructions?: InstructionPart[];
  secureTextEntry?: boolean;
  style?: ViewStyle | TextStyle | (ViewStyle | TextStyle)[];
  onBlur?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

function generateKey(input: string, index: number): string {
  return `${input}-${index}`;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  instructions,
  secureTextEntry = false,
  style,
  onBlur,
  ...otherProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const toggleSecureEntry = () => setIsSecure((prev) => !prev);

  const renderInstructions = () => {
    if (!instructions) return null;

    return (
      <Text style={styles.instructions}>
        {instructions.map((part, index) => (
          <Text
            key={generateKey(part.text, index)}
            style={part.bold ? styles.bold : null}
          >
            {part.text}
          </Text>
        ))}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          {...otherProps}
          secureTextEntry={isSecure}
          style={[
            styles.input,
            isFocused ? styles.inputFocus : undefined,
            error ? styles.error : undefined,
            style,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecureEntry}>
            <Feather
              name={isSecure ? 'eye-off' : 'eye'}
              size={22}
              color="#0007"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        renderInstructions()
      )}
    </View>
  );
};

export default Input;

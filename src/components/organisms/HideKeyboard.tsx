import type { ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface HideKeyboardProps {
  children: ReactNode;
}

const HideKeyboard: React.FC<HideKeyboardProps> = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default HideKeyboard;

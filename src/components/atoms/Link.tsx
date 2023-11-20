import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 15.5,
    fontWeight: '500',
    color: '#1397e6',
  },
});

interface LinkProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle | TextStyle | (ViewStyle | TextStyle)[];
}

const Link: React.FC<LinkProps> = ({ text, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Link;

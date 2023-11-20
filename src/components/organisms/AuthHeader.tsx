import { AntDesign } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { FormDataKey } from '../../../stores/form';
import useFormStore from '../../../stores/form';

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0001',
    borderRadius: 50,
  },
  iconPosition: {
    position: 'absolute',
    zIndex: 2,
    left: 8.5,
  },
  titleContainer: {
    width: '100%',
    marginTop: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
  },
  desc: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.5,
    marginTop: 8,
    color: '#000',
  },
});

interface AuthHeaderProps {
  navigation: NavigationProp<ParamListBase>;
  title?: string;
  desc?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ navigation, title, desc }) => {
  const { activeStepIndex, setActiveStepIndex, setFormData } = useFormStore(
    (state) => state,
  );

  const handleBackPress = () => {
    if (activeStepIndex === 0) {
      navigation.goBack();
    } else {
      const newStepIndex = (activeStepIndex - 1) as 0 | 1 | 2;
      let formDataKey: FormDataKey;
      switch (activeStepIndex) {
        case 1:
          formDataKey = 'phone';
          break;
        case 2:
          formDataKey = 'password';
          break;
        default:
          formDataKey = 'phone';
          break;
      }
      setFormData((prevData) => {
        const updatedData = { ...prevData };
        delete updatedData[formDataKey];
        return updatedData;
      });
      setActiveStepIndex(newStepIndex);
    }
  };

  return (
    <View>
      <View style={styles.iconContainer}>
        <Pressable
          hitSlop={40}
          style={styles.icon}
          onPress={() => handleBackPress()}
        >
          <AntDesign
            name={activeStepIndex === 0 ? 'close' : 'arrowleft'}
            size={23}
            color="#000"
            style={styles.iconPosition}
          />
        </Pressable>
      </View>
      {(title || desc) && (
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {desc && <Text style={styles.desc}>{desc}</Text>}
        </View>
      )}
    </View>
  );
};

export default AuthHeader;

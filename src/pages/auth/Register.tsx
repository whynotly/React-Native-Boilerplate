import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import Email from '@/components/templates/Email';

import useFormStore from '../../../stores/form';
import Error from '../../components/templates/Error';
import Name from '../../components/templates/Name';
import Password from '../../components/templates/Password';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

interface RegisterProps {
  navigation: NavigationProp<ParamListBase>;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { activeStepIndex } = useFormStore();
  let stepContent;

  switch (activeStepIndex) {
    case 0:
      stepContent = <Name navigation={navigation} />;
      break;
    case 1:
      stepContent = <Email navigation={navigation} />;
      break;
    case 2:
      stepContent = <Password navigation={navigation} />;
      break;
    default:
      stepContent = <Error navigation={navigation} />;
  }

  return <View style={styles.container}>{stepContent}</View>;
};

export default Register;

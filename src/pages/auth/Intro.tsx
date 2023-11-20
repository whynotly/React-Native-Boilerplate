import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -23.5,
    marginRight: -5.7,
  },
  ctaContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50,
  },
  ctaButton: {
    alignItems: 'center',
    backgroundColor: '#101828',
    borderRadius: 40,
    display: 'flex',
    marginBottom: 28,
    paddingVertical: 20,
    width: 325,
  },
  ctaText: {
    color: '#fff',
    fontSize: 19.5,
    fontWeight: '400',
  },
  ctaLink: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  text: {
    color: '#101828',
    fontSize: 16,
    opacity: 0.5,
  },
  ctaLinkText: {
    color: '#2c58ff',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 5,
  },
});

interface IntroProps {
  navigation: NavigationProp<ParamListBase>;
}
const Intro: React.FC<IntroProps> = ({ navigation }) => {
  const navigateToLogin = () => navigation.navigate('Login');
  const navigateToRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.logoContainer}>
        <Svg width={154} height={52} fill="none">
          <G clipPath="url(#a)">
            <Path
              fill="url(#b)"
              d="M139.144 13.698v15.146H154v6.816h-14.856v14.81h-6.8V35.66h-14.857v-6.816h14.857V13.698h6.8Z"
            />
            <Path
              fill="#000"
              d="M0 0h19.565c8.703 0 15.318 6.634 15.318 15.14 0 8.505-6.618 15.067-15.318 15.067H7.554v20.26H0V0Zm7.552 6.634v17.088h11.436c4.962 0 8.272-3.75 8.272-8.508 0-4.758-3.308-8.58-8.272-8.58H7.552ZM65.67 50.47v-4.614a18.12 18.12 0 0 1-13.02 5.48c-10.861 0-19.346-8.58-19.346-19.178s8.559-19.25 19.347-19.25c5.033 0 9.638 2.018 12.946 5.408v-4.614h7.265v36.77h-7.193v-.003ZM53.152 19.395c-6.977 0-12.587 5.624-12.587 12.762 0 7.138 5.61 12.762 12.587 12.762 6.978 0 12.588-5.696 12.588-12.762 0-7.066-5.61-12.762-12.587-12.762ZM92.496 20.188c-4.746 0-8.198 3.676-8.198 9.372v20.907h-7.264v-36.77h7.192v4.543c1.798-2.956 4.747-4.83 8.775-4.83h2.518v6.778h-3.023ZM104.725 0v29.922L119.541 13.7h8.631l-16.688 17.736 17.55 19.033H119.9L104.722 33.6v16.87h-7.264V0h7.267Z"
            />
          </G>
          <Defs>
            <LinearGradient
              id="b"
              x1={154}
              x2={117.487}
              y1={32.084}
              y2={32.084}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.1} stopColor="#1C7BFF" />
              <Stop offset={0.19} stopColor="#1C83FF" />
              <Stop offset={0.34} stopColor="#1C9CFF" />
              <Stop offset={0.53} stopColor="#1CC3FF" />
              <Stop offset={0.7} stopColor="#1CEEFF" />
              <Stop offset={0.71} stopColor="#1CEEFF" stopOpacity={0.93} />
              <Stop offset={0.76} stopColor="#1CEEFF" stopOpacity={0.65} />
              <Stop offset={0.81} stopColor="#1CEEFF" stopOpacity={0.42} />
              <Stop offset={0.86} stopColor="#1CEEFF" stopOpacity={0.24} />
              <Stop offset={0.9} stopColor="#1CEEFF" stopOpacity={0.11} />
              <Stop offset={0.93} stopColor="#1CEEFF" stopOpacity={0.03} />
              <Stop offset={0.95} stopColor="#1CEEFF" stopOpacity={0} />
            </LinearGradient>
            <ClipPath id="a">
              <Path fill="#fff" d="M0 0h154v51.333H0z" />
            </ClipPath>
          </Defs>
        </Svg>
      </View>
      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={navigateToLogin}>
          <Text style={styles.ctaText}>Најави се</Text>
        </TouchableOpacity>
        <View style={styles.ctaLink}>
          <Text style={styles.text}>Сакате нов профил?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.ctaLinkText}>Регистрирај се</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

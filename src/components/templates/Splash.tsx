import { BlurView } from 'expo-blur';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  text: {
    color: '#000',
    fontSize: 16,
    opacity: 0.5,
    marginLeft: 10,
    fontWeight: '500',
    marginTop: 26,
    textAlign: 'center',
  },
  blurContainer: {
    zIndex: 10,
    position: 'absolute',
    width: '110%',
    height: '110%',
    left: 0,
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

const Splash = ({ isBlurred = false }: { isBlurred: boolean }) => {
  if (isBlurred) {
    return (
      <BlurView tint="light" intensity={20} style={styles.blurContainer}>
        <ActivityIndicator size="large" color="#000" />
      </BlurView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.logoContainer}>
        <Svg width={220} height={31} fill="none">
          <Path
            fill="#FFC42F"
            fillRule="evenodd"
            d="M101.675 18.35c-4.236-.36-7.74-1.383-7.74-3.07 0-6.24 5.066-11.305 11.312-11.305 6.236 0 11.301 5.066 11.301 11.306 0 1.686-3.494 2.71-7.739 3.07l-3.084 7.922a.513.513 0 0 1-.966 0l-3.084-7.923Z"
            clipRule="evenodd"
          />
          <Path
            fill="#2A2A2A"
            fillRule="evenodd"
            d="M105.243 0c8.432 0 15.277 6.847 15.277 15.279 0 8.433-6.845 15.279-15.277 15.279-8.433 0-15.28-6.846-15.28-15.279 0-8.432 6.847-15.278 15.28-15.278Zm-3.565 18.35 3.079 7.923a.517.517 0 0 0 .972 0l3.076-7.923c4.246-.36 7.743-1.383 7.743-3.07 0-6.24-5.065-11.306-11.305-11.306-6.24 0-11.306 5.067-11.306 11.307 0 1.686 3.497 2.71 7.741 3.07ZM0 30.556V0h8.855c6.994 0 11.35 4.537 11.35 10.695 0 5.983-4.356 10.693-11.35 10.693h-6.24v9.168H0ZM8.855 18.95c5.155 0 8.745-3.408 8.745-8.255 0-4.805-3.546-8.255-8.745-8.255h-6.24v16.51h6.24Z"
            clipRule="evenodd"
          />
          <Path
            fill="#2A2A2A"
            d="M27.109.001h-2.615V30.56h2.615V0ZM56.627 0v24.753L34.483.002h-.736v30.556h2.614V5.677l22.143 24.881h.691V.001h-2.57Z"
          />
          <Path
            fill="#2A2A2A"
            fillRule="evenodd"
            d="M65.133 17.333V0H75.4c7.158 0 11.646 4.754 11.646 11.13 0 6.203-4.488 11.088-11.646 11.088h-5.024v8.338h-5.243v-8.338h-2.44v-4.885h2.44Zm10.267 0c3.404 0 6.414-2.271 6.414-6.203 0-3.886-2.966-6.289-6.414-6.289h-5.024v12.492H75.4Z"
            clipRule="evenodd"
          />
          <Path
            fill="#2A2A2A"
            d="M135.085 30.557c7.379 0 10.563-4.663 10.563-8.356 0-11.082-16.373-6.922-16.373-13.375 0-2.42 2.097-4.119 5.329-4.119 2.752 0 5.111 1.53 5.461 4.416h5.365c-.176-5.645-5.322-9.122-10.739-9.122-6.419 0-10.651 3.773-10.651 8.91.045 11.25 16.373 6.793 16.373 13.247 0 2.165-2.052 3.694-5.328 3.694-3.233 0-5.678-1.613-6.203-4.884h-5.453c.394 5.733 4.711 9.59 11.656 9.59ZM180.585 30.479c.393 0 .686-.31.686-.686a.679.679 0 0 0-.686-.687.69.69 0 0 0-.687.686c0 .377.31.687.687.687ZM188.062 30.53c2.556 0 5.128-1.669 5.57-4.505h-1.016c-.442 2.23-2.457 3.573-4.554 3.573-2.883 0-4.865-2.164-4.865-4.965 0-2.802 1.982-4.966 4.865-4.966 2.097 0 4.112 1.344 4.554 3.574h1.016c-.442-2.836-3.014-4.504-5.57-4.504-3.44 0-5.878 2.568-5.878 5.896 0 3.326 2.438 5.896 5.878 5.896ZM200.785 30.556c3.292 0 5.961-2.588 5.961-5.93 0-3.34-2.669-5.928-5.961-5.928-3.295 0-5.962 2.587-5.962 5.929 0 3.341 2.667 5.929 5.962 5.929Zm0-.948c-2.72 0-4.948-2.164-4.948-4.981 0-2.817 2.228-4.981 4.948-4.981 2.735 0 4.948 2.163 4.948 4.98 0 2.818-2.213 4.982-4.948 4.982ZM219.756 18.698l-5.472 7.348-5.472-7.348h-.244v11.857h.98V21.12l4.621 6.23h.23l4.621-6.214v9.42h.98V18.697h-.244ZM149.796 12.837h-2.45v4.885h2.45v12.836h5.235V17.722h15.983v12.836h5.236V0h-5.236v12.836h-15.983V.001h-5.235v12.836Z"
          />
        </Svg>
      </View>
      <View style={{ marginBottom: 110 }}>
        <ActivityIndicator size="large" color="black" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

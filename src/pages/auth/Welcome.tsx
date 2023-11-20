import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import theme from '../../../theme';

interface Story {
  title: string;
  // image: string;
}

const stories: Story[] = [
  {
    title: 'One-Click Purchases: Making Shopping Effortless and Fast"',
    // image: require('../assets/IntroImages/FindParking.png'),
  },
  {
    title: 'Finding What You Need Instantly: A Seamless Shopping Experience',
    // image: require('../assets/IntroImages/OneClickPay.png'),
  },
  {
    title: 'Shop Anywhere, Anytime: Your Convenience, Our Commitment',
    // image: require('../assets/IntroImages/Analytics.png'),
  },
];

interface WelcomeProps {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 43,
    marginBottom: -5,
    paddingTop: 56,
  },
  backgroundContainer: {
    flex: 1,
  },
  storyHeader: {
    flex: 1,
    paddingHorizontal: theme.spacing[4],
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  indicator: {
    flex: 1,
    height: 3,
    backgroundColor: theme.colors.gray[200],
    marginHorizontal: 2,
    borderRadius: 20,
  },
  activeIndicator: {
    position: 'absolute',
    height: 3,
    backgroundColor: theme.colors.primary[350],
    left: 0,
  },
  story: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    color: theme.colors.gray[700],
    fontSize: 16,
    marginLeft: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  titleContainer: {
    marginTop: 22,
    paddingHorizontal: theme.spacing[4],
  },
  title: {
    color: theme.colors.gray[700],
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: theme.colors.gray[700],
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 16,
    marginHorizontal: theme.spacing[4],
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    padding: 15,
    borderRadius: 20,
    paddingVertical: 21,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  overlayLeft: {
    flex: 1,
  },
  overlayRight: {
    flex: 1,
  },
});

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const loopStories = true;

  useEffect(() => {
    progress.stopAnimation();
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 100,
      duration: 10000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        let nextIndex = currentStoryIndex + 1;
        if (nextIndex >= stories.length) {
          if (loopStories) {
            nextIndex = 0;
          } else {
            nextIndex = currentStoryIndex;
          }
        }
        setCurrentStoryIndex(nextIndex);
      }
    });
  }, [currentStoryIndex, loopStories, progress]);

  const goToPreviousStory = () => {
    setCurrentStoryIndex((oldIndex) => {
      if (oldIndex > 0) {
        return oldIndex - 1;
      }
      if (loopStories) {
        return stories.length - 1;
      }
      return 0;
    });
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((oldIndex) => {
      if (oldIndex < stories.length - 1) {
        return oldIndex + 1;
      }
      if (loopStories) {
        return 0;
      }
      return oldIndex;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.storyHeader}>
          <View style={styles.indicatorContainer}>
            {stories.map((story, index) => (
              <View key={story.title} style={styles.indicator}>
                {index === currentStoryIndex && (
                  <Animated.View
                    style={[
                      styles.activeIndicator,
                      {
                        width: progress.interpolate({
                          inputRange: [0, 100],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={styles.story}>
            <View>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Welcome to Pinposh</Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>
                  {stories[currentStoryIndex]?.title}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.overlayLeft}
            onPress={goToPreviousStory}
          />
          <TouchableOpacity
            style={styles.overlayRight}
            onPress={goToNextStory}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Welcome;

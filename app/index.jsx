import {  router } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

import Animated, {
  FadeIn,
  FadeOut,
  SlideOutLeft,
  SlideInRight,
} from 'react-native-reanimated';

//creating onBoarding screen check function

const onboardingSteps = [
  {
    icon: 'bulb',
    title: 'Capture Ideas on the Go!',
    description: 'Never let a great idea slip away. Capture and organize your thoughts on the go.',
  },
  {
    icon: 'sync',
    title: 'Sync Across All Devices',
    description: 'Access your notes seamlessly on any device. Sync effortlessly and pick up where you left off as your notes are always in sync',
  },
  {
    icon: 'checkmark-done',
    title: 'Start in Minutes',
    description: `Dive right in and start taking notes within minutes. Our app makes it easy to get started and stay organized.`
  },
];


export default function OnboardingScreen() {


  

  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      router.push("/(auth)/sign-up");
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
  
   if(screenIndex>0) setScreenIndex(screenIndex-1);
  };

  const endOnboarding = () => {
    // router.replace("/(auth)/sign-up");
    router.push("/(auth)/sign-up")
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <SafeAreaView style={styles.page}>
      {/* <Stack.Screen options={{ headerShown: false }} /> */}
      <StatusBar style="light" />

     

      <GestureHandlerRootView style={{flex:1}}>
        
        <GestureDetector gesture={swipes}>
          
          <View style={styles.pageContent} key={screenIndex}>
          <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              { backgroundColor: index === screenIndex ? '#CEF202' : 'grey' },
            ]}
          />
        ))}
      </View>
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Ionicons
                style={styles.image}
                name={data.icon}
                size={150}
                color="#CEF202"
              />
            </Animated.View>
            <View style={styles.footer}>
              <Animated.Text
                entering={SlideInRight}
                exiting={SlideOutLeft}
                style={styles.title}
              >
                {data.title}
              </Animated.Text>
              <Animated.Text
                entering={SlideInRight.delay(50)}
                exiting={SlideOutLeft}
                style={styles.description}
              >
                {data.description}
              </Animated.Text>
              <View style={styles.buttonsRow}>
                <Text onPress={endOnboarding} style={styles.buttonText}>
                  Skip
                </Text>
                <Pressable onPress={onContinue} style={styles.button}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#15141A',
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70,
  },
  title: {
    color: '#FDFDFD',
    fontSize: 50,
    fontFamily: 'Poppins-Black',
    letterSpacing: 1.3,
    marginVertical: 10,
    textAlign:"center",

  },
  description: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
    lineHeight: 28,
    textAlign:"center"
  },
  footer: {
    
  },

  buttonsRow: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    alignSelf:"flex-end"
  },
  button: {
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,

    padding: 15,
    paddingHorizontal: 25,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
    marginTop:20
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});
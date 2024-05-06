import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserSession = async (value) => {
    try {
      await AsyncStorage.setItem('user-session', value);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting User Session: ${e.message}`)

    }
  };

export const getUserSession = async () => {
    try {
      const value = await AsyncStorage.getItem('user-session');
      if (value === null) {
        return "false";
      }
   
        return value;
    
    } catch (e) {
        throw new Error(`Error while getting User Session: ${e.message}`)
    
    }
  };

  export const setOnboardingVisit = async (value) => {
    try {
      await AsyncStorage.setItem('onboarding', value);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting Onboarding Visit: ${e.message}`)

    }
  };

  export const getOnboardingVisit = async () => {
    try {
      const value = await AsyncStorage.getItem('onboarding');
        return value;
    
    } catch (e) {
        throw new Error(`Error while getting Onboarding: ${e.message}`)
    
    }
  };

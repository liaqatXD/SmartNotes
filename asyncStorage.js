import AsyncStorage from '@react-native-async-storage/async-storage';

// check if user is logged in or not
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


// check if visited onboarding screen or not
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

  //dark theme variable
  
  export const setTheme = async (value) => {
    try {
      await AsyncStorage.setItem('theme', value);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting Theme: ${e.message}`)

    }
  };

  export const getTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
        return value;
    
    } catch (e) {
        throw new Error(`Error while getting Theme: ${e.message}`)
    
    }
  };

  //storing user account

    
  export const setAccount = async (value) => {
    try {
      await AsyncStorage.setItem('account', value);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting Account: ${e.message}`)

    }
  };

  export const getAccount = async () => {
    try {
      return await AsyncStorage.getItem('account');
       
    
    } catch (e) {
        throw new Error(`Error while getting Account: ${e.message}`)
    
    }
  };
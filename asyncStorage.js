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
  const dbUser = JSON.stringify(value);
  await AsyncStorage.setItem('account', dbUser);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting Account: ${e.message}`)

    }
  };

  export const getAccount = async () => {
    try {
    const dbUser=   await AsyncStorage.getItem('account');
       return dbUser != null ? JSON.parse(dbUser) : null;
    
    } catch (e) {
        throw new Error(`Error while getting Account: ${e.message}`)
    
    }
  };

  // storing user tasks

  export const setToDo = async (value) => {
    try {
  const toDo = JSON.stringify(value);
  await AsyncStorage.setItem('to-do', toDo);
    } catch (e) {
      // saving error
      throw new Error(`Error while setting toDo: ${e.message}`)

    }
  };

  export const getToDo = async () => {
    try {
    const toDo=   await AsyncStorage.getItem('to-do');
       return toDo != null ? JSON.parse(toDo) : null;
    
    } catch (e) {
        throw new Error(`Error while getting toDo: ${e.message}`)
    
    }
  };
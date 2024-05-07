import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import AppwriteProvider from "../lib/AppwriteProvider";
import Toast from 'react-native-toast-message';
import { useColorScheme } from "nativewind";
import { getTheme } from "../asyncStorage";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();
  const { colorScheme,toggleColorScheme } = useColorScheme();
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(()=>{
    getTheme()
    .then((theme)=>{
      if(theme==='dark' && colorScheme==='light') toggleColorScheme();
    })
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded,error]);

  if(!fontsLoaded && !error) return null;



  return (
    <AppwriteProvider>
      <Slot />
      <Toast />
    </AppwriteProvider>
  )
}

export default RootLayout;
import { Image, Pressable} from 'react-native';
import {router} from "expo-router";
import { useColorScheme } from "nativewind";
const lightSetting=require("../assets/images/light_setting.png");
const darkSetting=require("../assets/images/dark_setting.png");
const Setting = () => {
  const {colorScheme}=useColorScheme();
  return (
   <Pressable onPress={()=>router.push('/settings ')}>
    <Image source={colorScheme==='light'?darkSetting:lightSetting} style={{width:50,height:50,alignSelf:"flex-end",margin:5}} />
   </Pressable>
  )
}

export default Setting;
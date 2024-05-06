import { Image, Pressable} from 'react-native';
import {router} from "expo-router";
const settingImg=require("../assets/images/setting.png");
const Setting = () => {
  return (
   <Pressable onPress={()=>router.push('/settings ')}>
    <Image source={settingImg} style={{width:60,height:60,alignSelf:"flex-end",margin:5}} />
   </Pressable>
  )
}

export default Setting;
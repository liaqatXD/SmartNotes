import { View, Button, Text, Switch} from 'react-native'
import {useState,useEffect,useContext} from 'react';
import AppwriteContext from "../../lib/AppwriteContext";
import { setUserSession } from '../../asyncStorage';
import { useColorScheme } from "nativewind";
import { setTheme } from '../../asyncStorage';
import { getAccount } from '../../asyncStorage';

const Settings = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(()=>{

    getAccount()
    .then((userData)=>{
        setAccount(userData);
      });
  },[])
  const [account,setAccount]=useState('');
  // const [darkMode,setDarkMode]=useState(false);
  const {appwrite,setIsLoggedIn}=useContext(AppwriteContext);
    const logout=()=>{
        appwrite.logoutUser();
        setIsLoggedIn(false);
        setUserSession("false");
    }
  return (
   (<View className="flex-1 p-6 justify-center bg-white dark:bg-black-dark">

  <Text className=" my-4 text-lg font-pregular
  p-2 dark:text-white">Email:   <Text className="bg-amber-400 dark:text-black">{account}</Text></Text>
  <View className='flex-row'>
    <Text className='my-4 text-lg font-pregular p-2 dark:text-white'>Dark Mode</Text>
    <Switch value={colorScheme==='dark'}
    thumbColor={colorScheme==='light'?'black':'white'}
    trackColor={{false: colorScheme==='light'? 'black':'white', true: colorScheme==='dark'? 'white':'black'}}
    onValueChange={()=>{
      // setDarkMode(colorScheme==='light'?true:false);
      toggleColorScheme();
      if(colorScheme==='light') setTheme('dark');
      else setTheme('light');
    }} 
    />
  </View>
 <Button title='Logout' onPress={logout} />
</View>)
  )
}

export default Settings
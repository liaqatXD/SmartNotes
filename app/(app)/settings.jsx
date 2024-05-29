import { View, Button, Text, Switch,Image} from 'react-native'
import {useState,useEffect,useContext} from 'react';
import AppwriteContext from "../../lib/AppwriteContext";
import {useQueryClient} from "@tanstack/react-query"
import { setUserSession } from '../../asyncStorage';
import { useColorScheme } from "nativewind";
import { setTheme } from '../../asyncStorage';
import { getAccount,setToDo,setFlashCardsStorage } from '../../asyncStorage';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const userImage=require("../../assets/images/user.png");

const Settings = () => {

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const queryClient=useQueryClient();
  useEffect(()=>{

    getAccount()
    .then((userData)=>{
        setAccount(userData);
      })
      .catch((err)=>console.log(err.message));
      
      
  },[])
  const [account,setAccount]=useState({});
  // const [darkMode,setDarkMode]=useState(false);
  const {appwrite,setIsLoggedIn}=useContext(AppwriteContext);
    const logout=()=>{
        appwrite.logoutUser();
        queryClient.removeQueries("notebooks");
        queryClient.removeQueries("notes");
        setIsLoggedIn(false);
        setUserSession("false");
        setToDo(null);
        setFlashCardsStorage([]);
    }
  return (
   (<View className="flex-1 p-6  bg-white dark:bg-black-light
   justify-center">

 <View className="items-center gap-4">
  <Image
  source={userImage} style={{width:130,height:130}}
  />
 <Text className="text-2xl 
  font-pextralight
 dark:text-white">{account.username}</Text>
 </View>

    {/* username */}
    <View className="flex-row items-end gap-4 pb-2 mt-4
     border-gray-300
     dark:border-gray-100" style={{borderBottomWidth:1}}>
    <Entypo name="user" size={28} color={colorScheme==='dark'?'#ccc'
      :'black'
    }   />
    <View className="gap-y-2 mt-2">
      <Text className="text-md font-pregular 
      tracking-widest
      dark:text-white">USERNAME</Text>
      <Text className="text-lg  font-pregular tracking-widest
      dark:text-white">@{account.username}</Text>
    </View>
    </View>

    {/* email */}

    <View className="flex-row items-end gap-4 pb-2 mt-4
     border-gray-300
     dark:border-gray-100" style={{borderBottomWidth:1}}>
   <Ionicons name="mail" size={28} color={colorScheme==='dark'?'#ccc'
      :'black'} />

    <View className="gap-y-2 mt-2">
      <Text className="text-md font-pregular 
      tracking-widest
      dark:text-white">EMAIL</Text>
      <Text className="text-lg  font-pregular tracking-widest
      dark:text-white">{account.email}</Text>
    </View>
    </View>

    {/* dark mode */}

    <View className="flex-row items-end gap-4 pb-2 my-4">
  <MaterialIcons name="dark-mode" size={32} color={colorScheme==='dark'?'#ccc':'black'} style={{marginBottom:8}} />

    <View className="gap-y-2">
      <Text className="text-md font-pregular 
      tracking-widest
      dark:text-white">DARK MODE</Text>
      <Switch value={colorScheme==='dark'}
    thumbColor={colorScheme==='light'?'black':'white'}
    trackColor={{false: colorScheme==='light'? 'black':'white', true: colorScheme==='dark'? 'white':'black'}}
    onValueChange={async ()=>{
      toggleColorScheme();
      if(colorScheme==='light') setTheme('dark');
      else setTheme('light');
      
      
    }} 
    />
    </View>
    </View>

{/* logout button */}
 <Button title='Logout' onPress={logout} />
 <StatusBar style={colorScheme==='light'?'dark':'light'} />
</View>)
  )
}

export default Settings
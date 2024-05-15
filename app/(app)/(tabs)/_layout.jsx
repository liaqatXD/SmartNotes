import { Tabs } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";


const TabsLayout = () => {
  const {colorScheme}=useColorScheme();
  return (

  <Tabs  screenOptions={{
    headerShown:false,
    tabBarHideOnKeyboard:true,
    // tabBarActiveTintColor: "#FFA001",
    // tabBarInactiveTintColor: "#CDCDE0",
    tabBarStyle: {
       backgroundColor: colorScheme==='dark'? '#131313' : '#F2F2F2',
      // borderTopWidth: 1,
      //  borderTopColor: "#232533",
      height:60,
      paddingBottom:5,
      
    },
  }}>
    <Tabs.Screen name='home' options={{
      tabBarLabel:"Home",
       tabBarIcon: ({ size,color }) =><Entypo name="home" size={30} color={color} />,
    }} />
    <Tabs.Screen name='notebook' options={{
       tabBarLabel:"Notebooks",
       tabBarIcon: ({size, color }) =><FontAwesome5 name="book-open" size={size} color={color} />,
    }}   />
     <Tabs.Screen name='todo' options={{
       tabBarLabel:"ToDo",
       tabBarIcon: ({size, color }) =><MaterialIcons name="featured-play-list" size={30} color={color} />
    }}   />
     <Tabs.Screen name='timer' options={{
       tabBarLabel:"Timer",
       tabBarIcon: ({size, color }) =><Ionicons name="alarm" size={30} color={color} /> 
    }}   />

  </Tabs>
  )
}

export default TabsLayout
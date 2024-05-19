import { Stack } from 'expo-router';
import { useColorScheme } from "nativewind";

export default function AppLayout() {
  const {colorScheme}=useColorScheme();
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown:false}} />
        <Stack.Screen name="settings" options={{
        title:"Settings"  ,
          headerTitleAlign:"center",
          headerStyle: {
            backgroundColor: colorScheme === 'dark'? '#131313' : 'white' ,
          },
          headerTitleStyle:{
          color:colorScheme==='dark'?'white':'black',
          fontFamily:"Poppins-SemiBold",
          fontSize:25,
        },
        headerTintColor:colorScheme==='dark'?'white':'black'
        } } 
          
          />
           <Stack.Screen name="rewards" options={{headerShown:false}} />
    </Stack>
  );
}

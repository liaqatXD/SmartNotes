import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ToDo = () => {
  return (
  
    <View className='bg-primary flex-1  dark:bg-black-dark'>
    <Text className=" dark:text-white">To DO</Text>
  </View>
)
   
}

export default ToDo
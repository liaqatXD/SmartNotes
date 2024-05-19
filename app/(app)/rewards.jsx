import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const Rewards = () => {
  return (
    <SafeAreaView className="flex-1">
    <ScrollView contentContainerStyle={{flexGrow:1}}>
     <View className="bg-primary flex-1 px-4 py-4
      dark:bg-black-dark">
        <Text>Rewarsd</Text>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Rewards
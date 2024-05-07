import { View, Text,ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Setting from '../../../components/Setting';
import { Link } from 'expo-router';


const Home = () => {
  return (
    <SafeAreaView className="flex-1">
     <ScrollView >
     <View className="bg-primary flex-1 px-4 py-4 dark:bg-black-dark">

     <Setting />
      <Text className=" font-pregular text-3xl dark:text-white">Home</Text>

{/* Finish Task Section */}
      <Link href="/todo" asChild>
        <Pressable>
          <View className="bg-black py-8 rounded-3xl px-8 mt-5 dark:bg-black-light">
            <View className="flex-row align items-center justify-between">
              <Text className="text-white text-3xl font-psemibold">Finish</Text>
              <Text className="bg-white text-2xl w-12 h-12 rounded-full text-center
              font-pregular pt-2 mb-2" >0</Text>
            </View>
            <Text className="text-white text-3xl font-plight text-center mt-6">Coding App</Text>
          </View>
        </Pressable>
      </Link>

      {/* Rewards */}
      <View className="flex-row flex-wrap gap-x-4 gap-y-8 my-4 justify-center">
        <View className="bg-pink-600 px-4 py-12 rounded-lg w-half">
          <Text className="text-white font-bold text-6xl">100</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Notes</Text>
        </View>
        <View className="bg-purple-600 px-4 py-12 rounded-lg w-half">
        <Text className="text-white font-bold text-6xl">60</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Tasks</Text>
        </View>
        <View className="bg-sky-400 px-4 py-12  rounded-lg  w-half">
        <Text className="text-white font-bold text-6xl">30</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Pomo</Text>
        </View>
        <View className="bg-teal-400 px-4 py-12  rounded-lg  w-half">
        <Text className="text-white font-bold text-6xl">25</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Flash</Text>
        </View>
      </View>
    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Home
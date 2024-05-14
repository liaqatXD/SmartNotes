import { View, Text,ScrollView ,TextInput,Pressable} from 'react-native'
import { useState } from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import Setting from "../../../../components/Setting";
import { Ionicons } from '@expo/vector-icons';
import FloatingButton from "../../../../components/FloatingButton";
import { useLocalSearchParams } from 'expo-router';
const NotebookDetail = () => {

  const [notes,setNotes]=useState([]);

  return (
    <SafeAreaView className="flex-1">

      {/* Add Notebook button */}
   <FloatingButton choice="note" 
      />

     <ScrollView >


      {/* Add Note modal */}
    

     <View className="bg-primary flex-1  px-4 py-4 dark:bg-black-dark">


     <Setting />
     {/* Notebook Title */}
      <View className="flex-row gap-2 items-center">
        <Text className=" font-pregular text-3xl dark:text-white ">
          {useLocalSearchParams().title}</Text>
        <Text className="text-3xl bg-orange-custom 
        text-white h-16 w-16 pt-4 text-center rounded-full font-pregular ">{notes.length}</Text>
      </View>

      {/* Search */}
      <View className="my-8 flex-row  border-gray-100
    bg-white rounded-2xl  items-center  "
    style={{borderWidth:1}}>
    <TextInput className="font-pregular text-lg p-4
    "  style={{flex:1}}
    placeholder='Search Notes'  />
    <Ionicons name="search-outline" size={24} color="grey" style={{paddingRight:8,marginBottom:5}} />
      </View>

     

    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default NotebookDetail;
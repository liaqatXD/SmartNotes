import { View, Text,ScrollView ,TextInput,Pressable} from 'react-native'
import { useState } from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useColorScheme } from "nativewind";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FloatingButton from "../../../../components/FloatingButton";
import { useLocalSearchParams } from 'expo-router';
import EditNotebookModal from '../../../../components/EditNotebookModal';
const NotebookDetail = () => {

  const notebook=useLocalSearchParams();
  const [notebookTitle,setNotebookTitle]=useState(notebook.title);
  const [notes,setNotes]=useState([]);
  const {colorScheme}=useColorScheme();
  const [isEditModalVisible,setIsEditModalVisible]=useState(false);
  return (
    <SafeAreaView className="flex-1">

      {/* Add Notebook button */}
   <FloatingButton choice="note" 
      />

     <ScrollView contentContainerStyle={{flexGrow:1}} >


      {/* Edit Notebook modal */}
    <EditNotebookModal 
    toggle={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible} setNotebookTitle={setNotebookTitle}
    notebook={{
     title: notebookTitle,
     description: notebook.description,
     _id:notebook._id
    }}  />

     <View className="bg-primary flex-1  px-4 py-4 dark:bg-black-dark">


     {/* Edit notebook */}
     <Pressable onPress={()=>setIsEditModalVisible(true)}>
       <Entypo name="pencil" size={40} color={colorScheme==='light'?'black':'white'} style={{alignSelf:"flex-end",margin:5}} />
     </Pressable>

     {/* Notebook Title */}
      <View className="flex-row gap-2 items-center">
        <Text className=" font-pregular text-3xl dark:text-white ">
          {notebookTitle}</Text>
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
import { View, Text,ScrollView ,TextInput,Pressable,Image} from 'react-native'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useColorScheme } from "nativewind";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import FloatingButton from "../../../../components/FloatingButton";
import { useLocalSearchParams, Link} from 'expo-router';
import { getNotes } from '../../../../api/note';
import EditNotebookModal from '../../../../components/EditNotebookModal';
import NoteTemplate from '../../../../components/NoteTemplate';

const emptyImg=require("../../../../assets/images/empty-box.png");


const NotebookDetail = () => {
  const notebook=useLocalSearchParams();

      // React Query code, fetching notes
const { isPending, isError, data:notes,isFetching }=useQuery({
  queryKey:["notes"],
  queryFn:async ()=>{
    const data = await getNotes(notebook._id);
    return data
  }
});


  const [notebookTitle,setNotebookTitle]=useState(notebook.title);
  const {colorScheme}=useColorScheme();
  const [isEditModalVisible,setIsEditModalVisible]=useState(false);
  const [search,setSearch]=useState("");

  return (
    <SafeAreaView className="flex-1">

      {/* Add Notebook button */}
   <FloatingButton choice="note" 
    notebook={notebook._id}
      />

     <ScrollView contentContainerStyle={{flexGrow:1}}
       keyboardShouldPersistTaps='handled' >


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
      <View className="flex-row gap-x-4 items-center">
        <Text className=" font-pregular text-2xl dark:text-white 
        mr-2">
          {notebookTitle}</Text>
        <Skeleton show={isFetching} radius={'round'}
        colorMode={colorScheme}
        transition={{
          type:"timing",
          "duration":1000
        }}
      
        >
          <Text className="text-2xl bg-purple-600
          text-white h-12 w-12 py-2 text-center
     
          rounded-full font-pregular ">
            {isFetching?0:notes?.length}</Text>
        </Skeleton>
      </View>

      {/* Search */}
      <View className="my-8 flex-row  border-gray-100
    bg-white rounded-2xl  items-center  "
    style={{borderWidth:1}}>
    <TextInput className="font-pregular text-lg p-4
    "  style={{flex:1}}
    onChangeText={(value)=>setSearch(value)}
    placeholder='Search Notes'  />
    <Ionicons name="search-outline" size={24} color="grey" style={{paddingRight:8,marginBottom:5}} />
      </View>

         {/* Notes */}
         {
isFetching && <Skeleton show={isFetching}
colorMode={colorScheme}
width="100%"
height={80}
transition={{
  type:"timing",
  "duration":2000
}}
>

</Skeleton>
   }
   {
    isError && <Text>Error...</Text>
   }
   {
   !isFetching && notes?.map((note,index)=>{
if(note.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <Link key={index} href={{pathname:`notebook/note/${note.title}`,params:{
      title:note.title,
     content:note.content,
     _id:note._id,
     notebook:notebook._id
   }}} asChild >
    <Pressable>
      <NoteTemplate title={note.title}
       preview={note.content?note.content.slice(0,40).concat('...').replace(/\n/g, '. '):""} />
    </Pressable>
   </Link>
 )
    })
   }

   {/* No notes found */}
{
  !isFetching && notes?.length===0 && <View className="flex-1 
  items-center gap-2 justify-center">
    {/* <AntDesign name="frowno" size={120} color={colorScheme==='light'?'lightgrey':'lightgrey'}  style={{textAlign:"center",marginVertical:20}} />
    <Text className="text-center text-2xl font-pmedium
    dark:text-white">No Notes Found</Text> */}
    <Image source={emptyImg} style={{width:"40%",height:"40%"}} />
    <Text className="text-center text-2xl font-pregular
    dark:text-white">No Notes Found</Text> 

  </View>
}
    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default NotebookDetail;
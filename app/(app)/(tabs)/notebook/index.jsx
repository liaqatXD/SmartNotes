import { View, Text,ScrollView ,TextInput,Pressable} from 'react-native'
import { useState } from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import Setting from "../../../../components/Setting";
import { Ionicons } from '@expo/vector-icons';
import FloatingButton from "../../../../components/FloatingButton";
import AddNotebook from '../../../../components/AddNotebook';
import NotebookTemplate from '../../../../components/NotebookTemplate';
import { Link } from 'expo-router';
import {useQuery} from "@tanstack/react-query";
import {getNotebooks} from "../../../../api/notebook";

const Notebook = () => {

    // React Query code, fetching notebooks
const { isPending, isError, data:notebooks }=useQuery({
    queryKey:["notebooks"],
    queryFn:getNotebooks
  });

  const [isNotebookModalVisible,setIsNotebookModalVisible]=useState(false);
  const [search,setSearch]=useState("");

  // if (isPending) {
  //   return <Text>Loading...</Text>
  // }

  // if (isError) {
  //   return <Text>Error: {error.message}</Text>
  // }


  return (
    <SafeAreaView className="flex-1">

      {/* Add Notebook button */}
   <FloatingButton choice="notebook" 
      setIsNotebookModalVisible={setIsNotebookModalVisible}
      />

     <ScrollView contentContainerStyle={{flexGrow:1}}>


      {/* Add Notebook modal */}
     <AddNotebook toggle={isNotebookModalVisible} 
     setIsNotebookModalVisible={setIsNotebookModalVisible}
       />

     <View className="bg-primary flex-1  px-4 py-4 dark:bg-black-dark">


     <Setting />
     {/* Notebooks Title */}
      <View className="flex-row gap-2 items-center">
        <Text className=" font-pregular text-3xl dark:text-white ">Notebooks</Text>
        <Text className="text-3xl bg-orange-custom 
        text-white h-16 w-16 pt-4 text-center rounded-full font-pregular ">{notebooks?.length || 0}</Text>
      </View>

      {/* Search */}
      <View className="my-8 flex-row  border-gray-100
    bg-white rounded-2xl  items-center  "
    style={{borderWidth:1}}>
    <TextInput className="font-pregular text-lg p-4
    "  style={{flex:1}}
    placeholder='Search Notebooks' value={search} 
    onChangeText={(value)=>setSearch(value)}  />
    <Ionicons name="search-outline" size={24} color="grey" style={{paddingRight:8,marginBottom:5}} />
      </View>

      {/* Notebooks */}
   {
isPending && <Text className="font-pbold text-3xl"
 style={{zIndex:10}}>Loading...</Text>
   }
   {
    isError && <Text>Error=/</Text>
   }
   {
    notebooks?.map((notebook,index)=>{
if(notebook.title.startsWith(search))
  return (
    <Link key={index} href={{pathname:`notebook/${notebook.title}`,params:{title:notebook.title,
     description:notebook.description,
     _id:notebook._id
   }}} asChild >
    <Pressable>
      <NotebookTemplate title={notebook.title} description={notebook.description} />
    </Pressable>
   </Link>
 )
    })
   }

    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Notebook;
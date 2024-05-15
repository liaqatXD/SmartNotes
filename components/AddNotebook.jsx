import { View, Text,TextInput,Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import { useState } from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query"
import validateNotebook from '../validations/notebookValidation';
import { addNotebook } from '../api/notebook';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import Toast from 'react-native-toast-message';


const AddNotebook = ({toggle,setIsNotebookModalVisible}) => {


  const queryClient = useQueryClient();
  const {colorScheme}=useColorScheme();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [isActive,setIsActive]=useState(undefined);

  // React query, adding notebook
  const addNotebookMutation = useMutation({
    mutationFn: (notebookObj)=>addNotebook(notebookObj),
    onSuccess: () => {
      // Invalidate and refetch
      console.log('triggered')
      queryClient.invalidateQueries({ queryKey: ['notebooks'] })
    },
  })
    const handleNotebook=async ()=>{

      try {
      await  validateNotebook({title,description});
        addNotebookMutation.mutate({title,description});
        setIsNotebookModalVisible(false);
        setTitle("");
        setDescription("");
        
      } catch (error) {
        setIsNotebookModalVisible(false);
        Toast.show({
          type: 'error',
          text1: error.message,
          text2:"Notebook title is mandatory ⚠",
          visibilityTime:2000
        });
      }
      
    }
const handleTextInputFocus = () => {
    // Move cursor to the beginning of the text
  setIsActive(undefined);
  setTimeout(()=>setIsActive(true),100 );
  };
  return (
   
      <Modal isVisible={toggle}
      backdropColor={ colorScheme==='light'?'white':'#131313'}
      backdropOpacity={1}
      onBackButtonPress={()=>setIsNotebookModalVisible(false)} 
        >
           <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center gap-y-6"  >
          {/* down arow icon */}
        <Pressable onPress={()=>setIsNotebookModalVisible(false)}>
          <Feather name="chevron-down" size={50} color={
            colorScheme==='light'?'black':'white'
          }
          style={{textAlign:"right",marginBottom:20}} />
        </Pressable>
        {/* Add notebook */}
          <Text className='text-4xl font-psemibold
          dark:text-white upp text-center
          '>Add Notebook</Text>
          {/* Title */}
          <View className="my-4 gap-y-2">
            <Text className="text-lg font-plight uppercase
                   dark:text-white "
            >Title</Text>
            <TextInput
            className="rounded-md p-4 text-lg font-pregular
            dark:text-white dark:bg-black-light dark:border-0 "
            maxLength={30}
            style={{borderWidth:1}} onChangeText={(value)=>setTitle(value)}
            value={title}
             />
          </View>
        {/* description  */}
           <View className="my-4 gap-y-2">
             <Text
             className="text-lg font-plight uppercase
             dark:text-white "
             >Description</Text>
                     <TextInput
                     multiline={true}
                     selection={isActive ? undefined : { start: 0 }}
         onFocus={handleTextInputFocus}
                     textAlignVertical='top'
                     maxLength={40}
                     className="rounded-md p-4 text-lg font-pregular
                     dark:text-white dark:bg-black-light dark:border-0"
                     style={{borderWidth:1,height:120}} onChangeText={(value)=>setDescription(value)}
                     value={description}
             />
           </View>
            {/* button */}
            <Pressable onPress={handleNotebook} >
              <Text
              className="bg-black text-lg font-pregular
              py-4 rounded-md text-center
              text-white dark:bg-white  dark:text-black"
              >Add Notebook</Text>
            </Pressable>
           {/* <Button onPress={handleNotebook} title="Add notebook" /> */}
        </View>
    </SafeAreaView>
      </Modal>
  )
}

export default AddNotebook
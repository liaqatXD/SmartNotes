import { View, Text,TextInput,Pressable,Modal as Pop} from 'react-native';
import Modal from "react-native-modal";
import { useState } from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query"
import validateNotebook from '../validations/notebookValidation';
import { updateNotebook, deleteNotebook} from '../api/notebook';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


const EditNotebookModal = ({toggle,setIsEditModalVisible,notebook,setNotebookTitle}) => {
  const queryClient = useQueryClient();
  const [title,setTitle]=useState(notebook.title);
  const [description,setDescription]=useState(notebook.description);
  const {colorScheme}=useColorScheme();

  //modified code
  const [showConfirmation,setShowConfirmation]=useState(false);

  // React query, updating notebook
  const editNotebookMutation = useMutation({
    mutationFn: (notebookObj)=>updateNotebook(notebookObj),
    onSuccess: () => {
      // Invalidate and refetch
      // console.log('succeeded!!!');
      queryClient.invalidateQueries({ queryKey: ['notebooks'] })
    },
    // onError:()=>{
    //   console.log('failed=/');

    // }
  });

  // React query, deleting notebook
  const deleteNotebookMutation = useMutation({
    mutationFn: (notebookObj)=>deleteNotebook(notebookObj),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['notebooks'] })
    },
    onError:(error)=>{
      console.log('oh mo',error);
    }
  });
    const handleEditNotebook=async ()=>{

      try {
      await  validateNotebook({title,description});
      setNotebookTitle(title);
      editNotebookMutation.mutate({title,description,_id:notebook._id});
        setIsEditModalVisible(false);
        
      } catch (error) {
        setTitle(notebook.title);

        setIsEditModalVisible(false);
        Toast.show({
          type: 'error',
          text1: error.message,
          text2:"Notebook title is mandatory ⚠",
          visibilityTime:2000
        });
      }
      
    }
    const handleDeleteNotebook=()=>{
        deleteNotebookMutation.mutate({_id:notebook._id});
        router.back();
        Toast.show({
          type: 'success',
          text1: "Notebook deleted successfully!",
          visibilityTime:1200
        });
        
      
    }
  return (
    <Modal isVisible={toggle} 
    backdropColor={ colorScheme==='light'?'white':'#131313'}
    backdropOpacity={1}
    onBackButtonPress={()=>setIsEditModalVisible(false)}  >
      <View className="flex-1  gap-y-6" >

       {/* down arrow icon */}
       <Pressable onPress={()=>setIsEditModalVisible(false)}>
          <Feather name="chevron-down" size={50} color={
            colorScheme==='light'?'black':'white'
          }
          style={{textAlign:"right",marginBottom:20}} />
        </Pressable>

        {/* Edit Notebook title */}
        <Text className='text-4xl font-psemibold 
          dark:text-white text-center
          '>Edit Notebook</Text>

          {/* Title */}
          <View className="my-4 mt-8 gap-y-2">
        <Text className="text-lg font-plight uppercase
                   dark:text-white">Title</Text>
        <TextInput  
         className="rounded-md p-4 text-lg font-pregular
         dark:text-white dark:bg-black-light dark:border-0 "
        style={{borderWidth:1}} onChangeText={(value)=>setTitle(value)}
        value={title}
         />
         </View>

          {/* Description */}
        <View className="my-4 gap-y-2">
         <Text   className="text-lg font-plight uppercase
             dark:text-white ">Description</Text>
        <TextInput  
        textAlignVertical='top'
        maxLength={40}
        className="rounded-md p-4 text-lg font-pregular
        dark:text-white dark:bg-black-light dark:border-0"
        style={{borderWidth:1,height:120}} onChangeText={(value)=>setDescription(value)}
        value={description}
         />
        </View>


          {/* Save Changes */}
          <Pressable onPress={handleEditNotebook} >
              <Text
              className="bg-black text-lg font-pregular
              py-4 rounded-md text-center
              text-white dark:bg-white  dark:text-black"
              >Save Changes</Text>
            </Pressable>

            {/* Delete Notebook */}
            <Pressable onPress={()=>setShowConfirmation(true)} >
              <Text
              className="bg-black text-lg font-pregular
              py-4 rounded-md text-center
              text-white dark:bg-white  dark:text-black"
              >Delete Notebook</Text>
            </Pressable>

          {/* Pop-up */}
          <Pop
          animationType="slide"
          transparent={true}
          visible={showConfirmation}
          onRequestClose={() => setShowConfirmation(false)}
          >
            <View className=" flex-1 justify-center items-center">
              <View className="bg-black-usual w-10/12 rounded-lg 
              py-8 px-6">

          <Text className="text-white font-pregular 
          text-lg text-center">
            Deleting this notebook will delete all of 
            its notes as well!</Text>

          {/* Buttons */}
          <View className="mt-7 flex-row justify-between">
            {/* Cancel */}
            <Pressable onPress={()=>setShowConfirmation(false)}>
            <Text className="text-lg text-white uppercase">Cancel</Text>
            </Pressable>
            {/* Delete */}
            <Pressable onPress={()=>{
              setShowConfirmation(false);
              handleDeleteNotebook();
            }}>
            <Text className="text-lg text-white uppercase">Delete</Text>
            </Pressable>

          </View>

              </View>
            </View>
          </Pop>

         {/* <Button onPress={handleEditNotebook} title="Save Changes" />
         <Button  onPress={handleDeleteNotebook} title="Delete Notebook" /> */}

      </View>

    </Modal>
  )
}

export default EditNotebookModal;
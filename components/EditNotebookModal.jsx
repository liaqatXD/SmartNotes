import { View, Text,TextInput,Button } from 'react-native';
import Modal from "react-native-modal";
import { useState } from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query"
import validateNotebook from '../validations/notebookValidation';
import { updateNotebook, deleteNotebook} from '../api/notebook';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';


const EditNotebookModal = ({toggle,setIsEditModalVisible,notebook,setNotebookTitle}) => {
  const queryClient = useQueryClient();
  const [title,setTitle]=useState(notebook.title);
  const [description,setDescription]=useState(notebook.description);

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
    backdropColor='white'
    backdropOpacity={1}
    onBackButtonPress={()=>setIsEditModalVisible(false)}  >
      <View className="flex-1"  >
        {/* {
            addNotebookMutation.isPending && 
             <Text> 'Adding Notebook...'</Text>

        } */}
        <Text className='text-black'>Edit Notebook</Text>
        <Text>Title</Text>
        <TextInput  
        style={{borderWidth:1}} onChangeText={(value)=>setTitle(value)}
        value={title}
         />
         <Text>Description</Text>
        <TextInput  
        style={{borderWidth:1}} onChangeText={(value)=>setDescription(value)}
        value={description}
         />
         <Button onPress={handleEditNotebook} title="Save Changes" />
         <Button  onPress={handleDeleteNotebook} title="Delete Notebook" />

      </View>

    </Modal>
  )
}

export default EditNotebookModal;
import { View, Text,TextInput,Button } from 'react-native';
import Modal from "react-native-modal";
import { useState } from 'react';
import validateNotebook from '../validations/notebookValidation';
import Toast from 'react-native-toast-message'


const AddNotebook = ({toggle,setIsNotebookModalVisible,addNotebook}) => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
    
    const handleNotebook=async ()=>{

      try {
      await  validateNotebook({title,description});
        addNotebook({title,description});
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
  
  return (
    <Modal isVisible={toggle} 
    backdropColor='white'
    backdropOpacity={1}
    onBackButtonPress={()=>setIsNotebookModalVisible(false)}  >
      <View className="flex-1"  >
        <Text className='text-black'>Add Notebook</Text>
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
         <Button onPress={handleNotebook} title="Add notebook" />

      </View>

    </Modal>
  )
}

export default AddNotebook
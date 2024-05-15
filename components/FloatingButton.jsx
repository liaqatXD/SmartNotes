import { View } from 'react-native';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
const FloatingButton = ({choice,setIsNotebookModalVisible,notebook}) => {

  const {colorScheme}=useColorScheme();
  const toggleNotebookModal=()=>{
    setIsNotebookModalVisible(true);
  }
  const addNote=()=>{
    router.push(`notebook/note/${notebook}`);
  }
  return (
    <View style={{position:"absolute", bottom:30,right:20,zIndex:1}}>
    
  <Pressable onPress={()=>{
    if(choice==='notebook') toggleNotebookModal();
    else addNote();
  }}  >
    {
      choice ==='notebook'?  <SimpleLineIcons name="notebook" size={50} color={colorScheme==='dark'?'white':'black'}
      /> :
      <AntDesign name="addfile" 
      size={50} color={colorScheme==='dark'?'white':'black'} />
     
    }
    
  </Pressable>
 
    </View>
  )
}

export default FloatingButton
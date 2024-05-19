import { View,Image } from 'react-native';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
const notebookImage=require("../assets/images/notebook.png");
const noteImage=require("../assets/images/note.png");

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
      choice ==='notebook'?  /*<SimpleLineIcons name="notebook" size={50} color={colorScheme==='dark'?'white':'black'}
      /> */ <Image source={notebookImage} style={{width:70,height:70}} />:
      // <AntDesign name="addfile" 
      // size={50} color={colorScheme==='dark'?'white':'black'} />
      <Image source={noteImage} style={{width:60,height:60}} />
     
    }
    
  </Pressable>
 
    </View>
  )
}

export default FloatingButton
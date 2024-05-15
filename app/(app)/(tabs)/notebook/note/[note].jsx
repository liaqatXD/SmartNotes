import { View,ScrollView ,TextInput,Pressable} from 'react-native'
import { useState,useEffect } from 'react';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import Markdown from 'react-native-markdown-display';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { addNote, updateNote,deleteNote} from '../../../../../api/note';
import { useLocalSearchParams,router } from 'expo-router';
import { validateNote } from '../../../../../validations/note';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from "nativewind";
import Toast from 'react-native-toast-message';
import themes from "../../../../../markdownStyles";



// generates current data and time
const getCurrentDateTime = () => {
  const currentDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayOfWeek = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();
  
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  const formattedDateTime = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} at ${formattedTime}`;
  
  return formattedDateTime;
};

const Note = () => {
  const queryClient = useQueryClient();
  const note=useLocalSearchParams();

    // create note
  const saveNoteMutation = useMutation({
    mutationFn: (noteObj)=>addNote(noteObj),
    onSuccess: ({_id}) => {
      setNoteId(_id);
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
     console.log(error)
    },
  });

   // Updating note
   const updateNoteMutation = useMutation({
    mutationFn: (noteObj)=>updateNote(noteObj),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
     console.log(error)
    },
  });

 // deleting note
 const deleteNoteMutation = useMutation({
  mutationFn: (noteObj)=>deleteNote(noteObj),
  onSuccess: () => {
   
    queryClient.invalidateQueries({ queryKey: ['notes'] });
   
    router.back();
    

  },
  onError: (error) => {
   console.log(error)
  },
});

  useEffect(()=>{
    if(!note.title) {
      setNoteTitle(getCurrentDateTime());
      saveNoteMutation.mutate({title:getCurrentDateTime()
        ,content:noteContent
        ,notebook:note.note});
    }
    else {
      
      setNoteTitle(note.title);
      setNoteContent(note.content);
      // setNotebook(note.notebook);
      setNoteId(note._id);
    }
  },[])

  //handling update note
  const handleUpdateNote=async ()=>{
    try {
      await validateNote({title:noteTitle});
      updateNoteMutation.mutate({title:noteTitle,
        content:noteContent,
        noteId:noteId
      });
      Toast.show({
        type: 'success',
        text1:"Note synced successfully!",
        visibilityTime:1000
      });
      
      
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error.message,
        text2:"Note title is mandatory ⚠",
        visibilityTime:1500
      });
    }
  }

  const handleDeleteNote=()=>{
    deleteNoteMutation.mutate({_id:noteId});
    Toast.show({
      type: 'success',
      text1:"Note deleted successfully!",
      visibilityTime:2000
    });
  }

  //states
    const {colorScheme}=useColorScheme();
    const [showMarkdown,setShowMarkdown]=useState(false);
    const [noteTitle,setNoteTitle]=useState("");
    const [noteContent,setNoteContent]=useState("");
    const [noteId,setNoteId]=useState("");
    // const [notebook,setNotebook]=useState("");
  const [isActive,setIsActive]=useState(undefined);

    const handleTextInputFocus = () => {
      // Move cursor to the beginning of the text
    setIsActive(undefined);
    setTimeout(()=>setIsActive(true),100 );
    };

  return (
    <SafeAreaView className="flex-1">

    
     <ScrollView contentContainerStyle={{flexGrow:1}} >

    <View className="bg-primary flex-1 
     dark:bg-black">
      {/* icons */}
      <View className="flex-row  items-center justify-between p-4">

        {/* back button */}
        <Pressable onPress={()=>router.back()}>
          <Ionicons name="arrow-back-sharp" size={35} color={colorScheme==='light'?'black':'white'} />
        </Pressable>

        <View className="flex-row gap-x-5 items-baseline">
         
         {/* delete */}
          <Pressable onPress={handleDeleteNote}>
            <MaterialIcons name="delete" size={35} color={colorScheme==='light'?'black':'white'} />
          </Pressable>
         
         {/* cloud  */}
          <Pressable onPress={handleUpdateNote}>
            <Entypo name="upload-to-cloud" size={35} color={colorScheme==='light'?'black':'white'} />
          </Pressable>
            
            {/* glasses/edit */}
              <Pressable onPress={ ()=>setShowMarkdown(!showMarkdown)}>
              {
                showMarkdown?<Entypo name="pencil" size={35} color={colorScheme==='light'?'black':'white'}  />: <MaterialCommunityIcons name="sunglasses" size={35} 
                color={colorScheme==='light'?'black':'white'}
                />
              } 
              </Pressable>
        </View>

      </View>

      {/* Note title */}
 <View className=" px-4 mb-5">
   <TextInput  placeholder='Note Title'
    color={colorScheme==='light'?'black':'white'}
   className="pt-3  font-pmedium text-lg dark:border-white"
   style={{borderBottomWidth:1}} value={noteTitle}
   onChangeText={(value)=>setNoteTitle(value)}
    />
 </View>

{/* Note editor */}
<View className="flex-1 px-4"> 

{/* markdown */
  
  showMarkdown? <Markdown
  style={colorScheme==='light'?themes.lightTheme:themes.darkTheme}
  >{noteContent}</Markdown>:  <TextInput
       inputMode='text'
       color={colorScheme==='light'?'black':'white'}
       textAlignVertical='top'
        selection={isActive ? undefined : { start: 0 }}
       onFocus={handleTextInputFocus}
        multiline={true}
         style={{flex:1,
          paddingHorizontal:4,
          marginHorizontal:4,
          
         }}
         className="font-pregular text-lg"
        onChangeText={(value)=>setNoteContent(value)} 
        value={noteContent}>
        </TextInput>
  
  
}



</View>




    </View>


    </ScrollView>

     </SafeAreaView>
  );
}

export default Note;

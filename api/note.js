// const BASE_URL="http://192.168.43.172:8000/api/notes";
const BASE_URL="http://192.168.1.28:8000/api/notes";
import Toast from "react-native-toast-message";
import { getAccount,setAccount } from "../asyncStorage";
import { updateUser } from "./user";
//get all notes
export const getNotes=async(notebookId)=>{
    try {
        const response=  await fetch(`${BASE_URL}/${notebookId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok while getting notes.');
        }
    return await response.json();
      
        
      } catch (error) {
        throw new Error(error.message);
      }
}

// post a note
export const addNote=async({title,content,notebook})=>{
  try {
  
      const response=  await fetch(BASE_URL,{
          method:"POST",
          headers: {
              'Content-Type': 'application/json'
            },
       body: JSON.stringify({ title, content,notebook})
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while adding note.');
      }
      //async storage logic, incrementing notes
    const user=await getAccount();
    user.noOfNotes+=1;

    //badge logic
    if(user.noOfNotes===1 && user.noOfBadges===0){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }

   else  if(user.noOfNotes===10 && user.noOfBadges===1){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }

  else  if(user.noOfNotes===50 && user.noOfBadges===2){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }

 else if(user.noOfNotes===100 && user.noOfBadges===3){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }

  else if(user.noOfNotes===500 && user.noOfBadges===4){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }
    else if(user.noOfNotes===1000 && user.noOfBadges===5){
      user.noOfBadges+=1;
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2:"You have unlocked a new badge🏅",
        visibilityTime:1500
      });
    }

     updateUser(user,user.email);
    setAccount(user);
   return await response.json();
      
    } catch (error) {
     throw new Error(error.message)
    }
}

//update a note
export const updateNote=async(note)=>{
  try {
      const response=  await fetch(`${BASE_URL}/${note.noteId}`,{
          method:"PUT",
          headers: {
              'Content-Type': 'application/json'
            },
       body: JSON.stringify({title: note.title,content: note.content })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while updating note.');
      }
   return await response.json();
    
      
    } catch (error) {
     throw new Error(error.message)
    }
}

// delete a note
export const deleteNote=async({_id})=>{
  try {
      const response=  await fetch(`${BASE_URL}/${_id}`,{
          method:"DELETE",
          headers: {
              'Content-Type': 'application/json'
            },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while deleting note.');
      }
      //async storage logic, incrementing notes
    const user=await getAccount();
   if(user.noOfNotes>0) user.noOfNotes-=1;
     updateUser(user,user.email);
    setAccount(user);
   return await response.json();
    
      
    } catch (error) {
     throw new Error(error.message)
    }
}
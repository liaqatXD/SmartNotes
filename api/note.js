const BASE_URL="http://192.168.1.28:8000/api/notes";
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
    user.noOfNotes-=1;
     updateUser(user,user.email);
    setAccount(user);
   return await response.json();
    
      
    } catch (error) {
     throw new Error(error.message)
    }
}
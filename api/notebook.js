import { getAccount, setAccount } from "../asyncStorage";
import { updateUser } from "./user";
// const BASE_URL="http://192.168.43.172:8000/api/notebooks";
const BASE_URL="http://192.168.1.28:8000/api/notebooks";
//get all notebooks
export const getNotebooks=async()=>{
    try {
        const {_id}=await getAccount();
        const response=  await fetch(`${BASE_URL}/${_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok while getting notebooks.');
        }
    return await response.json();
      
        
      } catch (error) 
      {
        console.log(error.message);
        throw new Error(error.message);
      }
}

//post a notebook
export const addNotebook=async({title,description})=>{
    try {
      const {_id}=await getAccount();
        const response=  await fetch(BASE_URL,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
         body: JSON.stringify({ title, description,author:_id })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok while adding notebook.');
        }
     return await response.json();
      
        
      } catch (error) {
        console.log(error.message)
       throw new Error(error.message)
      }
}

// update a notebook
export const updateNotebook=async({title,description,_id})=>{
    try {
        const response=  await fetch(`${BASE_URL}/${_id}`,{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
              },
         body: JSON.stringify({ title, description })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok while updating notebook.');
        }
     return await response.json();
      
        
      } catch (error) {
       throw new Error(error.message)
      }
}

// delete a notebook

export const deleteNotebook=async({_id})=>{
    try {
        const response=  await fetch(`${BASE_URL}/${_id}`,{
            method:"DELETE",
            headers: {
                'Content-Type': 'application/json'
              },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok while deleting notebook.');
        }
        //async logic to keep notes account updated
    //  return await response.json();
        const {deletedCount}=await response.json();
     const user=await getAccount();
     user.noOfNotes-=deletedCount;
     updateUser(user,user.email);
     setAccount(user);
    return {"success":"notebook deleted successfully!"};
        
      } catch (error) {
       throw new Error(error.message)
      }
}
// adding user to database
const BASE_URL="http://192.168.1.28:8000/api/users";

export const addUser= async (username,email)=>{
    try {
        const response=  await fetch(BASE_URL,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
         body: JSON.stringify({ username, email })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok while adding user.');
        }
     return await response.json();
      
        
      } catch (error) {
       throw new Error(error.message)
      }
}

// getting user from database
export const getUser=async (email)=>{
    try {
        const response=  await fetch(`${BASE_URL}/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok while adding user.');
        }
    return await response.json();
      
        
      } catch (error) {
        throw new Error(error.message);
      }
}

// updating user
export const updateUser=async(user,email)=>{
  try {
      const response=  await fetch(`${BASE_URL}/${email}`,{
          method:"PUT",
          headers: {
              'Content-Type': 'application/json'
            },
       body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while updating notebook.');
      }
   return await response.json();
    
      
    } catch (error) {
     throw new Error(error.message)
    }
}

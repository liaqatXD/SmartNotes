import { object, string } from "yup"

const noteSchema = object({
  title: string().max(50).required(),
});



export  const  validateNote=async (note)=>{
   try {
     await noteSchema.validate(
        note,
        { strict: true },
      );
   } catch (error) {
    throw new Error(`${error.message}`)
   }
}


 

import { object, string } from "yup"

const notebookSchema = object({
  title: string().max(20).required(),
  description: string().max(40),
});



export  default  validateNotebook=async (notebook)=>{
   try {
     await notebookSchema.validate(
        notebook,
        { strict: true },
      );
   } catch (error) {
    throw new Error(`${error.message}`)
   }
}


 

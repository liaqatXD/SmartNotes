import { object, string } from "yup"

const notebookSchema = object({
  title: string().max(40).required(),
  description: string().max(100),
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


 

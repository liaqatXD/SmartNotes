import { object, string } from "yup"

const questionSchema = object({
  question: string().max(80).required(),
});

const answerSchema = object({
  answer: string().max(80).required(),
});



export  const  validateFlashCardQuestion=async (question)=>{
   try {
     await questionSchema.validate(
        question,
        { strict: true },
      );
   } catch (error) {
    throw new Error(`${error.message}`)
   }
}

export  const  validateFlashCardAnswer=async (answer)=>{
  try {
    await answerSchema.validate(
      answer,
       { strict: true },
     );
  } catch (error) {
   throw new Error(`${error.message}`)
  }
}



 

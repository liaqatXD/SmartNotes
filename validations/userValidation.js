import { object, string } from "yup"

const signUpSchema = object({
  username: string().required(),
  email: string().email().required(),
  password:string().min(8).required()
});

const loginSchema = object({
    email: string().email().required(),
    password:string().min(8).required()
  });


export const validateSignUp=async (user)=>{
   try {
    const parsedUser = await signUpSchema.validate(
       user,
        { strict: true },
      );
   } catch (error) {
    throw new Error(`Error:${error.message}`)
   }
}

export const validateLogIn=async (user)=>{
    try {
     const parsedUser = await loginSchema.validate(
        user,
         { strict: true },
       );
    } catch (error) {
        throw new Error(`Error:${error.message}`)
    }
 }
 
 

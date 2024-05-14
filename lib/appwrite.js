
import {ID, Account, Client} from "react-native-appwrite";
import { setAccount } from "../asyncStorage";
import { addUser } from "../api/user";
// create appwrite client

const appwriteClient=new Client();

class AppWriteService{
    constructor(){
        appwriteClient
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);
        this.account=new Account(appwriteClient)
    }

    // registering user
    async registerUser( email,password,username){
        try {
      const userAccount= await  this.account.create(ID.unique(),email,password,username);
      if(userAccount){
     return await addUser(userAccount.name,userAccount.email);
      }
        } catch (error) {
            throw new Error(`Error while registering: ${error.message}`)
        }
    }

    // logging in a user
    async loginUser(email,password){
        try {
          const {providerUid} =  await this.account.createEmailSession(email,password);
          return providerUid;
          
        } catch (error) {
            console.log(error.message);
            throw new Error(`Error while logging in: ${error.message}`);
        }
    }

    // getting current user (details)
    async getCurrentUser(){
        try {
        return await this.account.get();
        } catch (error) {
        console.log(`Error while fetching user details: ${error.message}`)
            
        }
    }
    // logging out user
    async logoutUser(){
        try {
       return  await this.account.deleteSession('current');
        } catch (error) {
        console.log(`Error while logging out user: ${error.message}`)
            
        }
    }
    //recovering user
    async recoverPassword(email){
        try {
            const response= await account.createRecovery(email, 'http://localhost:8081/recover');
            console.log(response);
            
        } catch (error) {
                console.log(error.message);
        }


    }
}

export default AppWriteService;

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform:"com.vision.smartnotes",
    projectId:"6633aa9000274557551d",
    databaseId:"6633bdbc003109ff385a",
    userCollectionId:"6633be230015ae702641"
}
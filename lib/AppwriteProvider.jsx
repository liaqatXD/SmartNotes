import { useState,useEffect } from 'react';
import {useRouter,useSegments} from "expo-router"
import AppwriteContext from './AppwriteContext';
import AppWriteService from './appwrite';
import { getUserSession,getOnboardingVisit,setOnboardingVisit } from '../asyncStorage';


const AppwriteProvider =  ({children}) => {
  
  const rootSegment=useSegments()[0];
  const [isLoggedIn,setIsLoggedIn]=useState('');
  const router=useRouter();
  useEffect( ()=>{
    getUserSession()
    .then((userSession)=>{
      getOnboardingVisit()
      .then((visited)=>{
        if(visited!=='true'){
          setOnboardingVisit('true');
        }
       else{
        if((userSession==="true" || isLoggedIn) && rootSegment!=='(app)'){
          router.replace('/(tabs)/home');
      
        }
        if(userSession==="false" && rootSegment!=='(auth)'){
          router.replace('/(auth)/sign-up');
        }
       }
        
      })
  
    });
    
  },[isLoggedIn,rootSegment]);

  const data={
    isLoggedIn,setIsLoggedIn,appwrite:new AppWriteService(),
  }
  return (
    <AppwriteContext.Provider value={data} >
        {children}
    </AppwriteContext.Provider>
  )
}

export default AppwriteProvider
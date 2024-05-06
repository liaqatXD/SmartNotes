import { View, Button } from 'react-native'
import {useContext} from 'react';
import AppwriteContext from "../../lib/AppwriteContext";
import { setUserSession } from '../../asyncStorage';


const Settings = () => {
  const {appwrite,setIsLoggedIn}=useContext(AppwriteContext);
    const logout=()=>{
        appwrite.logoutUser();
        setIsLoggedIn(false);
        setUserSession("false");
    }
  return (
    <View>
     <Button title='Log out' onPress={logout} />
    </View>
  )
}

export default Settings
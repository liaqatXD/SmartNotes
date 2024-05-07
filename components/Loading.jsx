import { ActivityIndicator } from "react-native";
import { View } from 'react-native'

const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:"center"}}>
      <ActivityIndicator size='2' />
    </View>
  )
}

export default Loading
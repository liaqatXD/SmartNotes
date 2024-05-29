import { ActivityIndicator } from "react-native";
import { View } from 'react-native'

const Loading = () => {
  return (
    <View style={{position:"absolute",left:"45%",top:"50%",zIndex:5}}>
      <ActivityIndicator size='2' />
    </View>
  )
}

export default Loading
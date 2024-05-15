import { View, Text } from 'react-native'

const NoteTemplate = ({title,preview}) => {
  return (
     
    <View className="bg-white border-gray-100 p-4 my-10 gap-y-2 
     dark:bg-black-light">
     
        <Text className="text-lg font-pbold
        dark:text-white">{title}</Text>
     
      
        <Text className="text-md text-gray-500
      dark:text-white  font-pregular  
        ">{preview}</Text>

    </View>

  )
}

export default NoteTemplate;
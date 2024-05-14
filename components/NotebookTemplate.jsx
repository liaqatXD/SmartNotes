import { View, Text } from 'react-native'

const NotebookTemplate = ({title,description}) => {
  return (
     
    <View className="bg-white border-gray-100 p-8 my-5
     rounded-2xl gap-y-2 
     dark:bg-black-light">
     
        <Text className="text-3xl font-pbold
        dark:text-white">{title}</Text>
     
      
        <Text className="text-lg text-gray-500
      dark:text-white  font-pregular  italic
        ">{description}</Text>

    </View>

  )
}

export default NotebookTemplate
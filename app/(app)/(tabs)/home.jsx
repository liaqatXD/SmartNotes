import { View, Text,ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Setting from '../../../components/Setting';
import { Link } from 'expo-router';
import { useState,useCallback } from 'react';
import {getAccount,getToDo} from "../../../asyncStorage";
import { useFocusEffect } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

const Home = () => {
  useFocusEffect(
   useCallback(()=> {
    getAccount()
    .then((userData)=>{
        setNoOfNotes(userData.noOfNotes);
        setNoOfPomo(userData.pomodoroTimers);
        // setNoOfTasks(userData.noOfTasks);
      })
      .catch((err)=>console.log(err.message));

      getToDo()
      .then(toDo=>{
     const tobeCompleted=toDo?.find((task)=>task.completed===false);
        if(tobeCompleted===undefined || tobeCompleted===undefined) {
          setTaskTitle('Get Work Done!');
      
        }

        else{
          setTaskTitle(tobeCompleted.text.trim().slice(0,20).concat('...'));
        }
        setNoOfTasks(
          toDo?.filter(task=>task.completed===true).length || 0
        )
      })
      .catch((err)=>console.log(err.message));
   }))

  const [noOfNotes,setNoOfNotes]=useState('');
  const [taskTitle,setTaskTitle]=useState('');
  const [noOfTasks,setNoOfTasks]=useState('');
  const [noOfPomo,setNoOfPomo]=useState('');

  return (
    <SafeAreaView className="flex-1">
     <ScrollView >
     <View className="bg-primary flex-1 px-4 py-4 dark:bg-black-dark">

     <Setting />
      <Text className=" font-pregular text-3xl dark:text-white">Home</Text>

{/* Finish Task Section */}
      <Link href="/rewards" asChild>
        <Pressable>
          <View className="bg-black py-8 rounded-3xl px-8 mt-5 dark:bg-black-light">
            <View className="flex-row  items-center justify-between">
              <Text className="text-white text-3xl font-psemibold">Finish
              </Text>
              {/* <Text className="bg-white text-2xl w-12 h-12 rounded-full text-center
              font-pregular pt-2 mb-2" >0</Text> */}
              <FontAwesome6 name="medal" size={32} color="white"
              style={{marginBottom:3}} />
            </View>
            <Text className="text-white text-3xl font-plight text-center mt-6">{taskTitle}</Text>
          </View>
        </Pressable>
      </Link>

      {/* Stats */}
      <View className="flex-row flex-wrap gap-x-4 gap-y-8 my-4 justify-center">
        <View className="bg-pink-600 px-4 py-12 rounded-lg w-half">
          <Text className="text-white font-bold text-6xl">{noOfNotes}</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Notes</Text>
        </View>
        <View className="bg-purple-600 px-4 py-12 rounded-lg w-half">
        <Text className="text-white font-bold text-6xl">{noOfTasks}</Text>
          <Text className="text-white font-psemibold text-4xl text-center">Tasks</Text>
        </View>
        <View className="bg-sky-400 px-4 py-7  rounded-lg" style={{
          width:"90%"
        }}>
        <Text className="text-white font-bold text-6xl text-center">{noOfPomo}</Text>
          <Text className="text-white font-psemibold pt-2 text-5xl text-center">Pomodoro</Text>
        </View>
      </View>
    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Home
import { View, Text, ScrollView,Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {router} from "expo-router";
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {getAccount} from "../../asyncStorage";
const zeroBadge=require("../../assets/images/no-results.png")

const rewards=[
  {
    id:0,
    title:"Pioneer",
    image:require("../../assets/images/badge1.png")
  },
   {
    id:1,
    title:"Enthusiast",
    image:require("../../assets/images/books.png")
  },
  {
    id:2,
    title:"Learner",
    image:require("../../assets/images/reading.png")
  },
  {
    id:3,
    title:"Sage",
    image:require("../../assets/images/old.png")
  },
  {
    id:4,
    title:"Scholar",
    image:require("../../assets/images/scholar.png")
  },
  {
    id:5,
    title:"Mastermind",
    image:require("../../assets/images/inheritance.png")
  }
]

const Rewards = () => {
useEffect(()=>{
  getAccount()
  .then(user=>{
    setNoOfBadges(user.noOfBadges);
  })
},[])

    const {colorScheme}=useColorScheme();
    const [noOfBadges,setNoOfBadges]=useState(0);
  return (
    <SafeAreaView className="flex-1">
    <ScrollView contentContainerStyle={{flexGrow:1}}>

     <View className="bg-primary flex-1 px-4 py-4
      dark:bg-black-dark">

          {/* header */}
        <View className="flex-row items-center"> 

        {/*back button */}
    <Pressable onPress={()=>router.back()}>
        <Ionicons name="chevron-back-outline" size={40}
        color={colorScheme==='light'?'black':'white'}
         style={{alignSelf:"flex-start"}} />
    </Pressable>

     {/* title */}
     <Text style={{alignSelf:"center",marginLeft:"20%"
                ,marginRight:"20%",
            }} 
            className="text-center
            font-plight text-2xl dark:text-white">Your Badges</Text>
        </View>

            {/* badges */}

            {
              noOfBadges>0?  <View className="px-20 py-12">
              {
                rewards.slice(0,noOfBadges).map((badge)=><View key={badge.id}
                className="bg-black-200 h-52 w-52 rotate-45
                dark:bg-black-light
                my-12
               self-end
               
                justify-center 
                rounded-lg items-center  ">
                  <View  className="-rotate-45 gap-2">
                    <Image source={badge.image}
                    style={{width:120,height:120}} />
                        <Text className="text-white
                        text-center font-pmedium text-lg">{badge.title}🎖</Text>
                  </View>
                 
                  </View>    
                  )
              }
              </View> :  //no badges found
              <View className='flex-1 justify-center
              items-center'> 
              <Image source={zeroBadge} 
              style={
                {
                  width:300,
                  height:300
                }
              }
              />
              <Text
              className="text-lg font-pregular dark:text-white"
              >No Badges Available</Text>
              </View>
            }
           
            


        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Rewards
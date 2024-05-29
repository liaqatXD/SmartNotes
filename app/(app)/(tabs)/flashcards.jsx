import { View, Text,ScrollView ,Pressable,Image} from 'react-native'
import { SafeAreaView, } from 'react-native-safe-area-context';
import Setting from "../../../components/Setting";
import { useEffect, useState } from 'react';
import AddFlashCardModal from '../../../components/AddFlashCardModal';
const addCardImg=require("../../../assets/images/flash-card.png");
const quizImg=require("../../../assets/images/quiz.png");
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {getFlashCardsStorage,setFlashCardsStorage} from "../../../asyncStorage";
import { useColorScheme } from "nativewind";

const FlashCards = () => {
  
const [isModalVisible,setIsModalVisible]=useState(false);
const [flashCards,setFlashCards]=useState([]);
const [questionNo,setQuestionNo]=useState(0);
const [showQuestion,setShowQuestion]=useState(true);
const {colorScheme}=useColorScheme();


//checking flash cards
useEffect(()=>{
    const checkFlashCards=async ()=>{
      const flashCards=await getFlashCardsStorage();
      if(flashCards===null || flashCards===undefined || flashCards?.length===0) return;
      else{
       setFlashCards(flashCards);
      }
    }
    checkFlashCards();
},[]);

//setting flash Cards
    useEffect(()=>{
        setFlashCardsStorage(flashCards);
    },[flashCards])
    const addFlashCard=()=>{
    setIsModalVisible(true);
    }

    const addCard=(flashcard)=>{
        setFlashCards([...flashCards,flashcard])
    }
    const deleteCard=()=>{
      if(questionNo>0)  setQuestionNo(questionNo-1);
        setFlashCards([...flashCards].filter((value,index)=>{
                return index!==questionNo;
        }))
    }
    const toggleQuestion=()=>{
        setShowQuestion(!showQuestion);
    }
    const previousCard=()=>{
        if(questionNo!==0){
            setQuestionNo(questionNo-1);
            setShowQuestion(true);
        }
    }
    const nextCard=()=>{
        if(questionNo+1!==flashCards.length){
            setQuestionNo(questionNo+1);
            setShowQuestion(true);
        }
    }
  return (
    <SafeAreaView className="flex-1">

      {/* Add Flashcard button */}
   <View style={{position:"absolute", bottom:30,right:20,zIndex:1}}>
       <Pressable onPress={addFlashCard}>
        <Image source={addCardImg}  style={{width:70,height:70}} />
       </Pressable>
   </View>

     <ScrollView contentContainerStyle={{flexGrow:1}}
       keyboardShouldPersistTaps='handled' >

      {/* Add Flashcard modal */}

        <AddFlashCardModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
        addCard={addCard}
        >

        </AddFlashCardModal>

     <View className="bg-primary flex-1  
     px-4 py-4 dark:bg-black-dark">
    {/* Settings */}
     <Setting />
{/*  FlashCard Title */}
        <View className="flex-row gap-2 items-center">
          <Text className=" font-pregular text-3xl dark:text-white ">
           FlashCards</Text>
          <Text className="text-xl
          text-white h-12 w-12 py-2 text-center rounded-full font-pregular bg-pink-600 mb-2"
        >{flashCards.length}</Text>
        </View>

        { /* Accessing Flash Cards */}
        {
            flashCards.length===0?
            <View className="
          flex-1
            justify-center items-center
          gap-y-4  ">
                <Image source={quizImg} style={{width:"40%",height:"28%"}} />
                <Text
                className="text-2xl font-pregular 
                text-gray-500 dark:text-white"
                >Add Some Flashcards!</Text>
            </View>:

            //flashCard section
            <View className="flex-1 
            justify-center items-center">
            <View className="bg-white p-4 rounded-xl
            gap-y-4 dark:bg-black-light" style={{
                width:"80%",
                minHeight:"50%",
                shadowColor: '#000', // Dark shadow color
                shadowOffset: { width: 2, height: 10 }, // Shadow offset
                shadowOpacity: 0.9, // Shadow opacity
                // elevation: 1, // Elevation for shado
            }}>
                {/* delete button */}
            <Pressable onPress={deleteCard} style={{alignSelf:"flex-end"}}>
                <MaterialCommunityIcons name="delete-empty" size={35} color={colorScheme==='light'?'black':'white'}  />
            </Pressable>
                <Text className="text-lg font-pregular dark:text-white">
             {showQuestion?flashCards[questionNo].question:flashCards[questionNo].answer}
                </Text>
                <Pressable onPress={toggleQuestion} className="self-end pt-8">
                <MaterialIcons name="u-turn-right" size={32} color={colorScheme==='light'?'black':'white'}  />

                </Pressable>

            {/* bottom options */}
            <View
            className="flex-row justify-between pt-20 pb-4 "> 

            {/* previous card button */}
            
            <Pressable onPress={previousCard}>
                <AntDesign name="arrowleft" size={32} color={colorScheme==='light'?'black':'white'} />
            </Pressable>

            {/* count */}

            <Text
            className="font-plight text-xl dark:text-white"
            >{questionNo+1}<Text
            className="text-gray-400"
            >/{flashCards.length}</Text></Text>

            {/* next card button */}

            <Pressable onPress={nextCard}> 
                <AntDesign name="arrowright" size={32} color={colorScheme==='light'?'black':'white'} />
            </Pressable>
             </View>
            </View>
            </View>
        }

    </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default FlashCards;
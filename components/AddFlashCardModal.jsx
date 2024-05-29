import { View, Text,Modal,TextInput,ScrollView,Pressable} from 'react-native';
import {useState,useRef, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateFlashCardQuestion,validateFlashCardAnswer } from '../validations/flashcard';
import Toast from 'react-native-toast-message';

const AddFlashCardModal = ({isModalVisible,setIsModalVisible,addCard}) => {
const [isQuestion,setIsQuestion]=useState(true);
const [question,setQuestion]=useState("");
const [answer,setAnswer]=useState("");
const questionRef = useRef(null);

useEffect(()=>{
    questionRef.current?.focus();
})

const closeModal=()=>{
    setIsModalVisible(false);
    setQuestion("");
    setAnswer("");
    setIsQuestion(true);
}

const addQuestion=async ()=>{

try {
  await  validateFlashCardQuestion({question});
    setIsQuestion(false);
    
} catch (error) {
    closeModal();
    Toast.show({
        type: 'error',
        text1: error.message,
        text2:"Cannot proceed without adding a Question first!",
        visibilityTime:2000
      });
}

}

const addAnswer=async ()=>{

    try {
        await  validateFlashCardAnswer({answer});
          addCard({question,answer});
          closeModal();
          
      } catch (error) {
          Toast.show({
              type: 'error',
              text1: error.message,
              text2:"Please fill out the answer field.",
              visibilityTime:2000
            });
            setIsModalVisible(false);
            setIsQuestion(true);
      }
      

   
}


  return (
   <Modal
   animationType="slide"
   transparent={true}
   visible={isModalVisible}
  // onRequestClose={() => setShowConfirmation(false)}
   >
  <SafeAreaView
  className="flex-1 bg-primary dark:bg-black-dark"
>
      <ScrollView contentContainerStyle={{flexGrow:1}}
           keyboardShouldPersistTaps='handled'>
          <View className="flex-1 justify-center align-middle " >
      
          <View className="bg-white mx-6 rounded-md p-4
          drop-shadow-2xl dark:bg-black-light">
            {isQuestion ? 
            //Question
            <View>
                <Text className="font-pblack text-3xl 
                dark:text-white ">Question</Text>
                <Text
                className="text-gray-100 font-pregular mb-4 
                text-right dark:text-white  "
                >{question.length}/80</Text>
               <TextInput
               ref={questionRef}
               className="font-pregular dark:text-white"
               multiline={true}
               onChangeText={(value)=>setQuestion(value)}
               value={question}
               maxLength={80}
               style={{height:100,textAlignVertical:"top",
               }
      
            }
               />
            
               <View className="flex-row justify-center

               gap-x-14">
                {/* Answer */}
                <Pressable onPress={closeModal}  >
                    <Text className="font-plight text-lg
                    dark:text-white">Cancel</Text>
                </Pressable>
                <Pressable onPress={addQuestion}>
                    <Text className="font-plight text-lg
                    dark:text-white">Next</Text>
                </Pressable>

                 </View>


                </View>:
                //**********Answer*******
            <View>
                <Text className="font-pblack text-3xl
                dark:text-white ">Answer</Text>
                <Text
                className="text-gray-100 font-pregular mb-4 
                text-right dark:text-white"
                >{answer.length}/80</Text>
               <TextInput
               className="font-pregular dark:text-white"
               multiline={true}
               onChangeText={(value)=>setAnswer(value)}
               value={answer}
               maxLength={80}
               style={{height:100,textAlignVertical:"top",
               }
      
            }
               />
            
               <View className="flex-row justify-center

               gap-x-14">
                {/* Answer */}
                <Pressable onPress={closeModal}  >
                    <Text className="font-plight text-lg
                    dark:text-white">Cancel</Text>
                </Pressable>
                <Pressable onPress={addAnswer}>
                    <Text className="font-plight text-lg
                    dark:text-white">Save</Text>
                </Pressable>

                 </View>

                </View>}
          </View>
          </View>
      </ScrollView>
  </SafeAreaView>
   </Modal>
  )
}

export default AddFlashCardModal
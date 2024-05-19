import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Setting from '../../../components/Setting';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { updateUser } from '../../../api/user';
import { getAccount,setAccount } from '../../../asyncStorage';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PomodoroTimer = () => {
    const {colorScheme}=useColorScheme();
    const [focusCount, setFocusCount] = useState(0);
    // modified code
    const [duration,setDuration]=useState(25 * 60);
    const [time, setTime] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval( () => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        setIsActive(false);
                        setFocusCount(prevCount => prevCount + 1);
                        setTime(duration);

                        // on completing Timer
                        // async logic, incrementing timer
                        getAccount()
                        .then(user=>{
                            user.pomodoroTimers+=1;
                            updateUser(user,user.email);
                            Toast.show({
                                type: 'success',
                                text1: 'Great Job! 🎉',
                                text2:"Take a break☕ and come back stronger!",
                                visibilityTime:1500
                              });
                           setAccount(user);
                        })
                        .catch((err)=>console.log(`Error while incrementing pomodoro timer, ${err.message}`));
                      


                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time,duration]);

    const startTimer = () => {
        setTime(duration);
        setIsActive(true);
        setModalVisible(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(duration);
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const renderModalItem = ({ item }) => (
        <TouchableOpacity style={styles.modalItem} onPress={() => {
          setDuration(item.duration);
          setTime(item.duration);
        setModalVisible(false);

          // startTimer();
        }}>
            <Text style={styles.modalItemText}
            className="font-pregular dark:text-white">{item.label}</Text>
        </TouchableOpacity>
    );

    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-primary p-4 dark:bg-black-dark">
            {/* Setting Icon */}
        <Setting />
           

            {/* Task Title and Focus Count */}
            <View style={styles.titleContainer}>
            <View className="flex-row gap-2 items-center">
                <Text 
                className="font-pregular text-3xl dark:text-white ">Focus</Text>

            <Text 
            className="text-xl bg-black
            text-white h-12 w-12 py-2 text-center rounded-full font-pregular dark:bg-black-light">{focusCount}</Text>
                </View>
            </View>

            <View style={styles.container}>
                {/* Timer */}
                <TouchableOpacity style={styles.timerContainer}
                className="bg-black dark:bg-black-light"
                onPress={() => startTimer(duration)}>
                    <Text className="text-4xl text-white font-pbold
                    ">{formatTime(time)}</Text>
                </TouchableOpacity>

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}
                        className="
                        bg-white dark:bg-black-usual">
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close-outline" size={30} color={colorScheme==='light'?'black':'white'}
                                 />
                            </TouchableOpacity>
                            <FlatList
                                data={timerOptions}
                                renderItem={renderModalItem}
                                keyExtractor={(item) => item.label}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Icons */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={resetTimer}>
                       
                        <SimpleLineIcons name="cup" size={40} color={colorScheme==='light'?'black':'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                       
                        <MaterialCommunityIcons name="clock" size={40} color={colorScheme==='light'?'black':'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </SafeAreaView>
    );
};

const timerOptions = [

  {
    label: '10s',
    duration: 0.10 * 60
  }
  ,{
    label: '25 minutes',
    duration: 25 * 60
  }
  ,
    {
        label: '45 minutes',
        duration: 45 * 60
    },
    {
        label: '1 hour',
        duration: 60 * 60
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingIcon: {
        position: 'absolute',
        top: 25,
        right: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 50,
        marginLeft: 10
    },
   
    focusCountContainer: {
        marginVertical: 10,
        marginLeft: 10,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        // backgroundColor: '#FE6087',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 250,
        borderWidth: 2,
        // borderColor: '#FE6087',
        marginBottom: 20,
        // backgroundColor: '#FE6087'
    },
   
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"baseline",
        width: '60%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        // backgroundColor: 'red',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginVertical:5,
    },
    modalItemText: {
        fontSize: 18,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default PomodoroTimer;
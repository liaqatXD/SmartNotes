

// Import necessary modules from React and React Native
import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { getToDo,setToDo } from '../../../asyncStorage';
import Setting from '../../../components/Setting';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';





// Define the TodoApp component
const TodoApp = () => {
  // Define state variables
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTodoText, setModalTodoText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  //modfied code
  // initalizing toDos
  useEffect(()=>{
      const checkToDo=async ()=>{
        const tasks=await getToDo();
        if(tasks===null || tasks===undefined) return;
        else{
         setTodos(tasks);
        }
      }
      checkToDo();
  },[])

  //transforming toDos
useEffect(()=>{
    setToDo(todos);
},[todos])

  // Function to add a new todo item
  const addTodo = () => {
    if (modalTodoText.trim() !== '') {
      setTodos([...todos, { text: modalTodoText, completed: false }]);
      setModalTodoText('');
      setModalVisible(false);
    }
  };

  // Function to toggle the completion status of a todo item
  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Function to delete a todo item
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  // Calculate the total number of todos
  const totalTodos = todos.length;
  // Calculate the number of completed todos
  const completedTodos = todos.filter(todo => todo.completed).length;

  // Filter todos based on search query
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Return the JSX for rendering the component
  return (
    <SafeAreaView className="flex-1">
      <View style={styles.container} className="bg-primary p-4 dark:bg-zinc-900">
      
        {/* Render settings icon */}
      
        <Setting />
        <View className="flex-row gap-2 items-center">
          <Text className=" font-pregular text-3xl dark:text-white ">
           Tasks</Text>
          <Text className="text-xl
          text-white h-12 w-12 py-2 text-center rounded-full font-pregular "
          style={{backgroundColor:"#1ED760"}}>{completedTodos}/{totalTodos}</Text>
        </View>
       
        {/* Render subtitle */}
        <Text style={styles.subtitle} className="text-gray-400 font-plight dark:text-white">Keep it up</Text>
        {/* Render input field and button to add new todo */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#9EA8B7"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="font-pregular"
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle-sharp" size={40} color="#1ED760" />
          </TouchableOpacity>
        </View>
        {/* Render list of todos */}
        <ScrollView style={styles.todoList}>
          {filteredTodos.map((todo, index) => (
            <View key={index} style={styles.todo} className="dark:bg-red-500">
              <TouchableOpacity onPress={() => toggleTodo(index)}>
                <Ionicons name={todo.completed ? "checkbox-outline" : "square-outline"} size={24} color="#606060" />
              </TouchableOpacity>
              <Text 
              className="font-pregular "
              style={[styles.todoText, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>{todo.text}</Text>
              <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteTodo(index)}>
                <MaterialCommunityIcons name="delete" size={24} color="#171717" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Modal for adding new todo */}
        <Modal
          animationType="slide"
        
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        
        >
          <View style={styles.centeredView} >
            <View style={styles.modalView}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add a todo"
                  value={modalTodoText}
                  onChangeText={setModalTodoText}
                  placeholderTextColor="#9EA8B7"
                  className="font-pregular "
                />
                <TouchableOpacity onPress={addTodo}>
                  <Ionicons name="add-circle-sharp" size={40} color="#1ED760" />
                </TouchableOpacity>
              </View>
              {/* Button to close modal */}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                className="px-5"
               
              >
                <Text style={styles.textStyle}  
                className="font-psemibold text-xl">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Define styles for the components
const styles = StyleSheet.create({
  // Container style
  container: {
    flex: 1,
    // padding: 20,
  },
  // Style for settings icon
  settingIcon: {
    position: 'absolute',
    top: 25,
    right: 20,
  },
  // Style for title
  title: {
    marginTop: 20,
  },
  // Style for subtitle
  subtitle: {
    fontSize: 16,
  },
  // Style for input container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  // Style for input field
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF'
  },
  // Style for todo list
  todoList: {
    marginTop: 20,
  },
  // Style for each todo item
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  // Style for todo text
  todoText: {
    flex: 1,
    marginLeft: 10,
  },
  // Style for delete icon
  deleteIcon: {
    marginLeft: 10,
  },
  // Style for circle showing completed todos
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1ED760',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 20
  },
  // Style for text inside circle
  circleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  // Style for title container
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Style for modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:80
  },
  // Style for modal content
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Style for button
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  // Style for close button in modal
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20
  },
  // Style for text inside button
  textStyle: {
    color: "white",
    textAlign: "center"
  },
});

// Export the TodoApp component
export default TodoApp;
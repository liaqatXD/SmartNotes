import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import {registerUser} from "../../lib/appwrite";
const Signup = () => {
  const [username,setUsername]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility
  const handleLogin = () => {
    // Implement login logic here
    // router.navigate("/(tabs)/home");
    console.log('Login pressed! Email:', email, 'Password:', password);
    registerUser(username,email,password);
  };

  return (
    <View style={styles.container}>
         <StatusBar style="light" backgroundColor='black' />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.title} 
          >Register.</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#ccc"
            />
            <Entypo name="user" size={24} color="#ccc" style={styles.icon}  />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Ionicons name="mail" size={24} color="#ccc" style={styles.icon} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry={hidePassword} // Toggle secureTextEntry based on hidePassword state
            />
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons name={hidePassword ? "eye-off" : "eye"} size={24} color="#ccc" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <Text style={styles.one} className="font-pregular text-base">Already have an account? <Text style={styles.two} onPress={() => router.push('/(auth)/sign-in')}>Login</Text></Text>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    // maxWidth: 400,
    elevation: 2, // for Android
    marginVertical: 20
  },
  title: {
    fontSize: 44,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily:"Poppins-SemiBold"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 30
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 10,
    color: 'white',
    fontFamily:"Poppins-Regular"
  },
  icon: {
    marginRight: 10,
    marginBottom:3
  },
  loginButton: {
    backgroundColor: 'white',
  
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    fontFamily:"Poppins-Regular"

  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    fontFamily:"Poppins-Regular"
    
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
   
    textAlign: 'center',
    fontFamily:"Poppins-Regular"

  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#888',
  },
  one: {
    color: '#F0F0F0',
    textAlign: 'center',
  },
  two: {
    color: '#56A51E'
  },
  logos: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  logo: {
    marginTop: 10
  }
});

export default Signup;
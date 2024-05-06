import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility

  const handleLogin = () => {
    // Implement login logic here
    router.navigate("/(tabs)/home");
    console.log('Login pressed! Email:', email, 'Password:', password);
  };

  return (
    <View style={styles.container}>
         <StatusBar style="light" backgroundColor='black' />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.form}>
          <Text style={styles.title}>Login.</Text>
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
          <Text style={{ color: '#56A51E',marginBottom: 10 }} className="font-pregular">Forgot Password?</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.orLine}></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine}></View>
          </View>

          <TouchableOpacity onPress={() => router.back()} style={styles.signupButton}>
            <Text style={styles.buttonText}>Create an Account</Text>
            <Ionicons name="person" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
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
    elevation: 2,
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
    marginBottom: 20,
  
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
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingLeft:10

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
  }
});

export default Login;

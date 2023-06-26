import axios from 'axios';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginSignupPage = ({onLogin}) => {


  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleFormSubmit = async() => {

    // Handle form submission based on isLogin state
    if (isLogin) {

      // Perform login logic
      try {
        const response = await axios.post(`https://ae7e-197-211-58-40.ngrok-free.app/xauth/login`, { email: email, password: password });

        console.log(email)
    
        // Handle response
        if (response.status === 200) {

            console.log(response.data)

          // Successful login
        const token = response.data.token;
        const userId = response.data.userId
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', userId)
          onLogin();
        } else {
          // Failed login
          alert(response.message);
        }
      } catch (error) {
        // Handle error
        alert("invalid credentials");
        console.log(error)
      } 
    } else {
        // Signup logic
        try {
          const response = await axios.post('https://ae7e-197-211-58-40.ngrok-free.app/users', { password: password, email: email, firstName: firstname, lastName: lastname});
          
          // Handle response
          if (response.status === 201) {
            // Successful signup
            // alert(` User successfully signed up `);
            const login_resp = await axios.post(`https://ae7e-197-211-58-40.ngrok-free.app/xauth/login`, { email: email, password: password });
            if (login_resp.status === 200) {

                console.log(login_resp.data)
    
                // Successful login
                //   alert(` User successfully logged in `);
                const token = login_resp.data.token;
                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userId', userId)
                onLogin();
                } else {
                // Failed login
                alert(response.message);
                }
          } else {
            // Failed signup
            alert(response.message);
          }
        } catch (error) {
          // Handle error
          alert(error);
        }
      }
     
    
  };

  return (
    <ScrollView>
    <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
      {isLogin ? (
        <>
          <View style={styles.vcontainer}>
          <Text style={styles.sinputLabel}>email</Text>
          <TextInput
            style={styles.scontainer}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="email"
          />
          <Text style={styles.sinputLabel}>password</Text>
          <TextInput
            style={styles.scontainer}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.inputLabel}>firstname</Text>
          <TextInput
            style={styles.input}
            value={firstname}
            onChangeText={text => setFirstName(text)}
            placeholder="Firstname"
          />
          <Text style={styles.inputLabel}>lastname</Text>
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={text => setLastName(text)}
            placeholder="Lastname"
          />
          <Text style={styles.inputLabel}>email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={styles.inputLabel}>password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          <Text style={styles.inputLabel}>confirm password</Text>
          <TextInput
            style={styles.input}
            value={repassword}
            onChangeText={text => setRePassword(text)}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </>
      )}
      <Button
        title={isLogin ? 'Login' : 'Signup'}
        onPress={handleFormSubmit}
      />
      <Button
        title={isLogin ? 'Switch to Signup' : 'Switch to Login'}
        onPress={() => setIsLogin(!isLogin)}
      />
    </KeyboardAwareScrollView>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200
    },

    inputLabel: {
        marginBottom: -1,
        marginStart: 15,
        marginTop: 10
        
      },
    
    sinputLabel: {
        marginBottom: -1,
        marginStart: 15,
        marginTop: 10
        
        },

    container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    },

    vcontainer: {
        flex: 1,
        marginTop: 240,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scontainer: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    urlinput: {
        borderColor: 'black',
        padding: 8,
        width: 75,
        margin: 10,
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
   
  });
  


export default LoginSignupPage;

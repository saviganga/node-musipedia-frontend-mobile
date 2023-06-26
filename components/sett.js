// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function Settings( { onLogout } ) {

  // call backend for artists when the app is loaded
  useEffect(() => {
    getUserProfile()
}, [])

  const [userProfile, setUserProfile] = useState({})


    const logout = async() => {

        await AsyncStorage.removeItem('userToken');
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        console.log('done')
        onLogout()
    }

  const getUserProfile = async() => {

    try {
      const userToken = await AsyncStorage.getItem('userToken')
      const userId = await AsyncStorage.getItem('userId')
      const headers = {
        Authorization: `JWT ${userToken}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`https://ae7e-197-211-58-40.ngrok-free.app/users/${userId}`, { headers })
      if (response.status === 200) {
        setUserProfile({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email
        })
      } else{
        alert('Unable to fetch user profile')
      }
    } catch (err) {
      console.log(err)
      alert('error mf')
    }

  }



return (
    <View style={styles.container}>

      <View style={styles.logoutButtonContainer}>
        <View style={styles.logoutButton}>
          <Button onPress={logout} title='logout' />
        </View>
      </View>

      <View style={styles.userProfileContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{userProfile.email}</Text>
          <Text style={styles.description}>{userProfile.firstName} {userProfile.lastName}</Text>
        </View>
      </View>

    </View>
  )
}



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

  container: {
    flex: 1,
    padding: 10
    // justifyContent: 'center',
    // alignItems: 'center',
    },
  logoutButtonContainer: {
    // marginBottom: 16,
    flex: 1
  },

  logoutButton: {
    alignItems: 'flex-end',
    flex: 1,
    // marginRight: 10
    },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  userProfileContainer: {
    marginBottom: 16,
    flex: 7
  },
  itemContainer: {
    marginBottom: 16,
    padding: 5
  },

 
});


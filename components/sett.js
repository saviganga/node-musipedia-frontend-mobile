// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function Settings( { onLogout } ) {


    const logout = async() => {

        await AsyncStorage.removeItem('userToken');
        const userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken)
        console.log('done')
        onLogout()
    }



return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
      {/* <View> */}
          <Button onPress={logout} title='logout' />

      {/* </View> */}
      </KeyboardAwareScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    },
 
});


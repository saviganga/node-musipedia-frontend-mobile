// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import LoginSignupPage from '/Users/saviganga/Documents/working-boy/native/mfe/components/xauth';
import Settings from '/Users/saviganga/Documents/working-boy/native/mfe/components/sett';
import Albums from '/Users/saviganga/Documents/working-boy/native/mfe/components/albums';
import Artists from '/Users/saviganga/Documents/working-boy/native/mfe/components/artists';
import Songs from '/Users/saviganga/Documents/working-boy/native/mfe/components/songs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name="Albums" component={Albums} />
        <Tab.Screen name="Artists" component={Artists} />
        <Tab.Screen name="Songs" component={Songs} />
            
      </Tab.Navigator>
    </NavigationContainer>
  );

  
};

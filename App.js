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
      <Stack.Navigator>
        {!isAuthenticated ? (
            <Stack.Screen name="auth">
              {(props) => <LoginSignupPage {...props} onLogin={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name=" ">
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="albums" component={Albums} />
                <Tab.Screen name="artists" component={Artists} />
                <Tab.Screen name="songs" component={Songs} />
                <Tab.Screen name="settings">
                  {(props) => <Settings {...props} onLogout={() => setIsAuthenticated(false)} />}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}  
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};

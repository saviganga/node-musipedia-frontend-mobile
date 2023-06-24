import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Songs = () => {

    useEffect(() => {
        // alert(`songs`)
        getSongs()
        console.log(songs)
    }, [])

    const [songs, setSongs] = useState([]);
 
    const getSongs = async() => {

        // Perform login logic
        try {
            const response = await axios.get('https://8af3-197-211-61-111.ngrok-free.app/songs');
        
            // Handle response
            if (response.status === 200) {

                // console.log(response.data)

                setSongs(response.data.data)

            } else {
            // Failed login
            alert(response.message);
            }
        } catch (error) {
            // Handle error
            alert("invalid credentials");
            console.log(error)
        } 
        }

    


    const renderItem = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        );
      };

    const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
    };

    return (
        <FlatList
          data={songs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      );


}


const styles = {
    container: {
      flex: 1,
      padding: 16,
    },
    itemContainer: {
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
    },
  };

  export default Songs;
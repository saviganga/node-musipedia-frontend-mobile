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
            const response = await axios.get('https://ae7e-197-211-58-40.ngrok-free.app/songs');
        
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
            <Text style={styles.description}>{item.artist.stageName}</Text>
          </View>
        );
      };

    const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
    };

    return (
        <View style={styles.container}>

            <View style={styles.addsongContainer}>
                <View style={styles.addsongButton}>
                    <Button title='add song' />
                </View>
            </View>

            <View style={styles.FlatListcontainer}>
                <FlatList
                data={songs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                />
            </View>
            
        </View>
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
    addsongContainer: {
        // marginBottom: 16,
        flex: 1,
      },
    addsongButton: {
    alignItems: 'flex-end',
    flex: 1
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
    },
    FlatListcontainer: {
        marginBottom: 16,
        flex: 7
      },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        margin: 10,
        width: 30,
        
    },
  };

  export default Songs;
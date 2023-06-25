import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Artists = () => {

    useEffect(() => {
        // alert(`artists`)
        getArtists()
        console.log(artists)
    }, [])

    const [artists, setArtists] = useState([]);
 
    const getArtists = async() => {

        // Perform login logic
        try {
            const response = await axios.get('https://ae7e-197-211-58-40.ngrok-free.app/artists');
        
            // Handle response
            if (response.status === 200) {

                // console.log(response.data)

                setArtists(response.data.data)

            
            } else {
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
            <Text style={styles.title}>{item.stageName}</Text>
            <Text style={styles.description}>{item.firstName} {item.lastName}</Text>
          </View>
        );
      };

    const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
    };

    return (
        <View style={styles.container}>

            <View style={styles.addartistContainer}>
                <View style={styles.addartistButton}>
                    <Button title='add artist' />
                </View>
            </View>

            <View style={styles.FlatListcontainer}>
                <FlatList
                data={artists}
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
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
    },
    addartistContainer: {
        // marginBottom: 16,
        flex: 1,
      },
    addartistButton: {
    alignItems: 'flex-end',
    flex: 1
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


  export default Artists;
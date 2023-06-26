import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';







const CreateSongForm = ({ onFormSubmit }) => {

    const [artist, setartist] = useState('')
    const [name, setname] = useState('')
    const [year, setyear] = useState('')

    // call backend to create artist
    const createSong = async() => {
      
        // Perform login logic
        try {
  
            const userToken = await AsyncStorage.getItem('userToken');
  
            const headers = {
                Authorization: `JWT ${userToken}`,
                'Content-Type': 'application/json',
              };
    
            const response = await axios.post('https://ae7e-197-211-58-40.ngrok-free.app/songs', {name: name, artist: artist, year: year}, { headers });
        
            // Handle response
            if (response.status === 201) {
  
                // console.log(response.data)
                alert('Successfully added new song')
                setname('')
                setartist('')
                setyear('')
                onFormSubmit()
            
            } else {
            alert(response.message);
            }
        } catch (error) {
            // Handle error
            alert(error);
            console.log(error)
        }
      }


    return (


        <View style={styles.container}>


            <View style={styles.addartistContainer}>
                <View style={styles.addartistButton}>
                    <Button onPress={onFormSubmit} title='cancel' />
                </View>
            </View>

            <View style={styles.FlatListcontainer}>

                <Text style={styles.inputLabel}>song name</Text>
                <TextInput
                style={styles.input}
                value={name}
                placeholder='enter song name'
                onChangeText={val => setname(val)}
                />

                <Text style={styles.inputLabel}>artist name</Text>
                <TextInput
                style={styles.input}
                value={artist}
                placeholder='enter artist'
                onChangeText={val => setartist(val)}
                />

                <Text style={styles.inputLabel}>song release year</Text>
                <TextInput
                style={styles.input}
                value={year}
                placeholder='enter song year of release'
                onChangeText={val => setyear(val)}
                />

                <Button onPress={createSong} title='submit info' />


            </View>
        
          
      
      </View>
      
    )
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
};



export default CreateSongForm;
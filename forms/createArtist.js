import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';







const CreateArtistForm = ({ onFormSubmit }) => {

    const [artistLastName, setartistLastName] = useState('')
    const [artistFirstName, setartistFirstName] = useState('')
    const [artistStageName, setartistStageName] = useState('')
    const [artistdob, setartistdob] = useState('')


    
    // // call backend to create artist
    const createArtist = async() => {
      
        // Perform login logic
        try {

            console.log(artistFirstName)
  
            const userToken = await AsyncStorage.getItem('userToken');
  
            const headers = {
                Authorization: `JWT ${userToken}`,
                'Content-Type': 'application/json',
              };
    
            const response = await axios.post('https://ae7e-197-211-58-40.ngrok-free.app/artists', {firstName: artistFirstName, lastName: artistLastName, stageName: artistStageName, DOB: artistdob}, { headers });
        
            // Handle response
            if (response.status === 201) {
  
                // console.log(response.data)
                alert('Successfully added new artist')
                setartistFirstName('')
                setartistLastName('')
                setartistStageName('')
                setartistdob('')
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


      <View contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
          <Text style={styles.inputLabel}>artist first name</Text>
          <TextInput
          style={styles.input}
          value={artistFirstName}
          placeholder='enter artist first name'
          onChangeText={val => setartistFirstName(val)}
          />

          <Text style={styles.inputLabel}>artist last name</Text>
          <TextInput
          style={styles.input}
          value={artistLastName}
          placeholder='enter artist last name'
          onChangeText={val => setartistLastName(val)}
          />

          <Text style={styles.inputLabel}>artist stage name</Text>
          <TextInput
          style={styles.input}
          value={artistStageName}
          placeholder='enter artist stagename'
          onChangeText={val => setartistStageName(val)}
          />

          <Text style={styles.inputLabel}>artist dob</Text>
          <TextInput
          style={styles.input}
          value={artistdob}
          placeholder='enter artist date of birth'
          onChangeText={val => setartistdob(val)}
          />

          <Button onPress={createArtist} title='submit info' />
      
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



export default CreateArtistForm;
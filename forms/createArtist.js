import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';







const CreateArtistForm = () => {

    const [artistLastName, setartistLastName] = useState('')
    const [artistFirstName, setartistFirstName] = useState('')
    const [artistStageName, setartistStageName] = useState('')
    const [artistdob, setartistdob] = useState('')


    const artistfirstnameChangeHandler = (val) => {
        console.log(val)
        setartistFirstName(val)
    };

    const artistlastnameChangeHandler = (val) => {
        console.log(val)
        setartistLastName(val)
    };

    const artiststagenameChangeHandler = (val) => {
        console.log(val)
        setartistStageName(val)
    };

    const artiststdobChangeHandler = (val) => {
        console.log(val)
        setartistdob(val)
    };

    return (


      <View contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
          <Text style={styles.inputLabel}>artist first name</Text>
          <TextInput
          style={styles.input}
          value={artistFirstName}
          placeholder='enter artist first name'
          onChangeText={artistfirstnameChangeHandler}
          />

          <Text style={styles.inputLabel}>artist last name</Text>
          <TextInput
          style={styles.input}
          value={artistLastName}
          placeholder='enter artist last name'
          onChangeText={artistlastnameChangeHandler}
          />

          <Text style={styles.inputLabel}>artist stage name</Text>
          <TextInput
          style={styles.input}
          value={artistStageName}
          placeholder='enter artist stagename'
          onChangeText={artiststagenameChangeHandler}
          />

          <Text style={styles.inputLabel}>artist dob</Text>
          <TextInput
          style={styles.input}
          value={artistdob}
          placeholder='enter artist date of birth'
          onChangeText={artiststdobChangeHandler}
          />

          {/* <Button onPress={pressButtonHandler} title='submit info' /> */}
      
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
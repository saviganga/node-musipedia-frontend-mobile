import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';







const CreateAlbumForm = () => {

    const [artist, setartist] = useState('')
    const [name, setname] = useState('')
    const [year, setyear] = useState('')


    const artistChangeHandler = (val) => {
        console.log(val)
        setartist(val)
    };

    const nameChangeHandler = (val) => {
        console.log(val)
        setname(val)
    };

    const yearChangeHandler = (val) => {
        console.log(val)
        setyear(val)
    };

    return (


      <View contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
        
          <Text style={styles.inputLabel}>album name</Text>
          <TextInput
          style={styles.input}
          value={name}
          placeholder='enter album name'
          onChangeText={nameChangeHandler}
          />

          <Text style={styles.inputLabel}>artist name</Text>
          <TextInput
          style={styles.input}
          value={artist}
          placeholder='enter artist'
          onChangeText={artistChangeHandler}
          />

          <Text style={styles.inputLabel}>album release year</Text>
          <TextInput
          style={styles.input}
          value={year}
          placeholder='enter album year of release'
          onChangeText={yearChangeHandler}
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



export default CreateAlbumForm;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';





const CreateAlbumForm = ({ onFormSubmit }) => {

    const [artist, setartist] = useState('')
    const [name, setname] = useState('')
    const [year, setyear] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const selectImage = () => {
        ImageCropPicker.openPicker({
          cropping: true,
          cropperCircleOverlay: false,
          compressImageMaxWidth: 5,
          compressImageMaxHeight: 5,
          compressImageQuality: 0.7,
          mediaType: 'photo'
        })
          .then(response => {
            setSelectedImage(response);
          })
          .catch(error => {
            console.log('ImagePicker Error: ', error);
          });
      };


    // call backend to create album
    const createAlbum = async() => {
      
        // Perform login logic
        try {
  
            const userToken = await AsyncStorage.getItem('userToken');
  
            const headers = {
                Authorization: `JWT ${userToken}`,
                'Content-Type': 'multipart/form-data',
              };

            const payload = new FormData();
            payload.append('albumArt', {
            uri: selectImage.path,
            type: selectImage.mime,
            name: selectImage.filename || 'image.jpg',
            });

            payload.append('artist', artist);
            payload.append('name', name);
            payload.append('year', year);
    
            const response = await axios.post('https://ae7e-197-211-58-40.ngrok-free.app/albums', payload, { headers });
        
            // Handle response
            if (response.status === 201) {
  
                // console.log(response.data)
                alert('Successfully added new album')
                setname('')
                setartist('')
                setyear('')
                setSelectedImage(null)
                onFormSubmit()
            
            } else {
            console.log('here')
            alert(response.message);
            }
        } catch (error) {
            // Handle error
            alert("unable to create album");
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
        
            <Text style={styles.inputLabel}>album name</Text>
            <TextInput
            style={styles.input}
            value={name}
            placeholder='enter album name'
            onChangeText={val => setname(val)}
            />

            <Text style={styles.inputLabel}>artist name</Text>
            <TextInput
            style={styles.input}
            value={artist}
            placeholder='enter artist'
            onChangeText={val => setartist(val)}
            />

            <Text style={styles.inputLabel}>album release year</Text>
            <TextInput
            style={styles.input}
            value={year}
            placeholder='enter album year of release'
            onChangeText={val => setyear(val)}
            />

            <Button title="Select Image" onPress={selectImage} />
            {selectedImage && (
                <View>
                <Image
                    source={{ uri: selectedImage.path }}
                    style={{ width: 200, height: 200, marginTop: 10 }}
                />
                {/* <TextInput
                    placeholder="Enter Image Name"
                    value={imageName}
                    onChangeText={text => setImageName(text)}
                    style={{ marginTop: 10, width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
                /> */}
                {/* <Button title="Upload Image" onPress={createAlbum} /> */}
                </View>
            )}

            <Button onPress={createAlbum} title='submit info' />

        </View>
      
      </View>
      
    )
  }



const styles = {
container: {
    flex: 1,
    padding: 10,
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
flex: 1,
color: 'red'
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
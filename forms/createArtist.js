import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';






const CreateArtistForm = ({ onFormSubmit }) => {

    const [artistLastName, setartistLastName] = useState('')
    const [artistFirstName, setartistFirstName] = useState('')
    const [artistStageName, setartistStageName] = useState('')
    const [artistdob, setartistdob] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);



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


    
    // // call backend to create artist
    const createArtist = async() => {
      
        // Perform login logic
        try {

            console.log(artistFirstName)
  
            const userToken = await AsyncStorage.getItem('userToken');
  
            const headers = {
                Authorization: `JWT ${userToken}`,
                'Content-Type': 'multipart/form-data',
              };

            const payload = new FormData();
            payload.append('image', {
            uri: selectImage.path,
            type: selectImage.mime,
            name: selectImage.filename || 'image.jpg',
            });

            payload.append('firstName', artistFirstName);
            payload.append('lastName', artistLastName);
            payload.append('stageName', artistStageName);
            payload.append('DOB', artistdob);
    
            const response = await axios.post('https://ae7e-197-211-58-40.ngrok-free.app/artists', payload, { headers });
        
            // Handle response
            if (response.status === 201) {
  
                // console.log(response.data)
                alert('Successfully added new artist')
                setartistFirstName('')
                setartistLastName('')
                setartistStageName('')
                setartistdob('')
                setSelectedImage(null)
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

                <Button onPress={createArtist} title='submit info' />

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
    marginBottom: 140,
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
    margin: 7,
    width: 200
},

inputLabel: {
    marginBottom: -1,
    marginStart: 15,
    marginTop: 10
    
    },
};



export default CreateArtistForm;
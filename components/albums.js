import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import CreateAlbumForm from '/Users/saviganga/Documents/working-boy/native/mfe/forms/createAlbum';



const Albums = () => {

    // call backend for artists when the app is loaded
    useEffect(() => {
        getAlbums()
    }, [])

    // declare state variables
    const [albums, setAlbums] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // functions to update state variables
    
    // toggle create album modal
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    // handle create album form submit - receive form data from create album form component and call create album function
    const handleFormSubmit = () => {
      toggleModal()
      getAlbums()

    };
 
    // call backend to get all artists
    const getAlbums = async() => {

        // Perform login logic
        try {
            const response = await axios.get('https://ae7e-197-211-58-40.ngrok-free.app/albums');
        
            // Handle response
            if (response.status === 200) {

                setAlbums(response.data.data)

            } else {
            alert(response.message);
            }
        } catch (error) {
            // Handle error
            alert(error);
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

            <View style={styles.addalbumContainer}>
                <View style={styles.addalbumButton}>
                    <Button onPress={toggleModal} title='add album' />
                </View>
            </View>


            <Modal
              isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modal}>
                  <CreateAlbumForm onFormSubmit={handleFormSubmit} />
                </View>
              </View>
            </Modal>

            <View style={styles.FlatListcontainer}>
                <FlatList
                data={albums}
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
    addalbumContainer: {
        // marginBottom: 16,
        flex: 1,
      },
    addalbumButton: {
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
    modalContainer: {
      marginTop: 40,
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center'
      
    },
    modal: {
      marginTop: 40,
      flex: 1,
      backgroundColor: 'white',
      
    },
  };



  export default Albums;
import { useState } from "react";
import { Image, Text, TouchableOpacity,StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
export default function ImageUpload(){

    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.uri);

        console.log(result.uri)
          
        }
      };
    return(
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {selectedImage ? (
          <>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Change Image</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="camera" size={50} color="#999" />
            <Text style={styles.addArtworkText}>
              {selectedImage ? 'Image was successfully uploaded' : 'Add Artwork here'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    imageUpload: {
      height: 150,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
    },
    addArtworkText: {
      marginTop: 10,
      color: '#999',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    uploadButton: {
      position: 'absolute',
      bottom: 10,
      left: '50%',
      transform: [{ translateX: -50 }],
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
    },
    uploadButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: '#000',
    },
    textArea: {
      height: 100,
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      marginHorizontal: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    cancelButton: {
      color: '#000',
    },
    scrollView: {
      width: '100%',
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
  });
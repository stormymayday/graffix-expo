import React, { useState } from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from "../../utils/uploadImage";

export default function ImageUpload(props) {
  const { handleImage } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets;
        console.log('Selected Image URI:', uri);
        setSelectedImage(uri);
        handleImage(uri);
      } else {
        console.log('Image selection was canceled.');
      }
    } catch (error) {
      console.error('Error picking image:', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage[0].uri }} style={styles.image} />
      ) : (
        <>
          <MaterialCommunityIcons name="camera" size={50} color="#999" />
          <Text style={styles.addArtworkText}>Add Artwork here</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageUpload: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
});

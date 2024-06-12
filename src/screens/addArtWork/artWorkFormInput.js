import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import uploadImage from '../../utils/uploadImage';
import HorizontalScrollOptions from '../../components/HorizontallScroll/horizontallScrollCategory';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import QRCode from 'react-native-qrcode-svg';

export default function ArtworkFormInput() {
  const [categories, setCategories] = useState(['Painting', 'Ceramics', 'Abstract', 'Nature', 'Photo']);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  function handleImage(uri) {
    setSelectedImage(uri);
  }

  function generateQrCode(api) {
    console.log('Generating QR Code');
    setQrCodeValue(api);
  }

  return (
    <View style={styles.container}>
      {qrCodeValue ? (
        <QRCode
          value={qrCodeValue}
          size={200}
        />
      ) : (
        <View style={styles.container}>
          <ImageUpload handleImage={handleImage} />
          <TextInput
            style={styles.input}
            placeholder="Name your Artwork"
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write about your Artwork"
            placeholderTextColor="#999"
            multiline
          />
          <HorizontalScrollOptions options={categories} />
          <Button title="Publish" style={styles.button} onPress={() => {
            uploadImage(selectedImage);
            generateQrCode('www.google.com');
          }} />
          <Button title="Cancel" style={styles.cancelButton} color="#999" />
        </View>
      )}
    </View>
  );
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

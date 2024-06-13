import { Platform } from 'react-native';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dionabso1/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'jluu73jf'; // Replace with your actual upload preset

export default async function uploadImage(selectedImage) {
  if (!selectedImage) {
    console.log('No image selected');
    return;
  }

  console.log('Selected Image:', selectedImage);

  const formData = new FormData();
  formData.append('file', {
    uri: selectedImage[0].uri,
    type: 'image/jpeg', // Adjust the type if needed
    name: 'upload.jpg' // Adjust the name if needed
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  console.log('Form Data:', formData);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response Status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const result = await response.json();
    console.log('Response Data:', result);

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log('Image uploaded: ', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
}

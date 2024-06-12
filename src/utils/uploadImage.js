export default uploadImage = async (selectedImage) => {
    if (!selectedImage) {
      console.log('No image selected');
      return;
    }

    const uriParts = selectedImage.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const mimeType = `image/${fileType}`;

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      name: `photo.${fileType}`,
      type: mimeType,
    });

    try {
      const response = await fetch('https://your-backend-url.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log(result);
      // Here should go responce with IMAGE ID and ETC so QR code can be generated
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
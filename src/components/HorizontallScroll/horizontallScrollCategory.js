import {StyleSheet, ScrollView, Text, TouchableOpacity, View } from "react-native"

export default function HorizontalScrollOptions (props){
    const {options} = props
    return(
        <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
/*StartScreen.js
//Purpose: The start screen will welcome the users and allow
//them to choose a global history of commits or a specified
//Developer: Ericka Capers
//Date: 12/3/2021
*/

//React native Dependencies
import React from 'react';
import { Text, View, ImageBackground, StyleSheet,
Button, TouchableOpacity, Dimensions } from 'react-native';

//grab dimensions of the device being used
var dimensions = {
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
}

//will hold method for pressing button
const onPress = () => {};

export default function StartScreen () {
  return (
    <View style={ styles.container }>
      <ImageBackground source={require('../images/bg.jpg')} resizeMode="cover" style={styles.image}>
      </ImageBackground>
       <View style={styles.content}>
          <View style = {styles.titlesView}>
           <Text style={styles.imageTitleText}>Welcome!</Text>
           <Text style={styles.imageSubTitleText}>Start viewing Git history now.</Text>
            <TouchableOpacity onPress={onPress} style={styles.button}>
              <Text style={styles.buttonText}>View Recent Global Commits</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={styles.button}>
              <Text style={styles.buttonText}>Search Specific Repository</Text>
            </TouchableOpacity>
          </View>
       </View>
    </View>
  )
}

//styles for StartScreen.js
const styles = StyleSheet.create({
  titlesView: {
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left, left, right, bottom: 0,
  },
  content: {
    alignItems: 'center',
    position: 'absolute',
    top, left, left, right, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  imageTitleText: {
    fontSize: dimensions.width < 500 ? 40: 80,
    color: 'white',
    fontWeight: '100',
    fontFamily: 'sans-serif-thin'
  },
  imageSubTitleText: {
    fontSize: dimensions.width < 500 ? 14: 20,
    color: 'white',
    paddingBottom: dimensions.height*.3
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  button: {
      width: dimensions.width >= 500?
        dimensions.width*.4 : dimensions.width*.7,
      backgroundColor: "#483766",
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
      alignSelf: "center",
  },
  buttonText: {
      color: "white",
      textAlign: "center"
  }
});
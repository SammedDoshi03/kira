import React from 'react'
import { Text, View, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native';
import { styles } from '../assets/styles/styles';
import { ActivityIndicator, Colors } from 'react-native-paper';


const WelcomeScreen = (props) => {

  return (
   <>
   <StatusBar translucent backgroundColor='transparent' />
     <ImageBackground
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}
      >
        <View>
          <Image
            source={require('../assets/images/logo-welcome.png')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>
        </View>
        <Text style={styles.text}>Be with Nature. Make new friends.</Text>
        <TouchableOpacity 
            onPress={() => props.navigation.navigate('Sign Up')}
          >
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
          >
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
      </ImageBackground>
   </>
  )
}


export default WelcomeScreen;
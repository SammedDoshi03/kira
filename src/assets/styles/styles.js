
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%'
    },
    logo:{
      width: 400,
      height: 400,
      // marginLeft: '5%',
      marginTop: '10%'
    },
    text: {
      color: 'white',
      // marginTop: '-25%',
      marginLeft: '15%',
      fontSize: 20,
      fontFamily: 'serif',
    },
    signup: {
      backgroundColor: 'white',
      color: '#003f00',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '40%',
      fontFamily: 'serif',
    },
    login: {
      backgroundColor: '#003f00',
      color: 'white',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: 15,
      fontFamily: 'serif',
    }, 
    checkBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',   
      alignItems: 'center',
      marginTop: 15,
  },
});
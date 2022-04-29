import React, { useState} from 'react'
import { StyleSheet, SafeAreaView,Text, View, ImageBackground, Image, StatusBar, TouchableOpacity,Alert } from 'react-native';
import { styles } from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from '../redux/actions/usersActions';

const LoginScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const users = useSelector(state => state.users.users);
  const variable = [users]
  // console.log(users);
  
  const dispatch = useDispatch();

  const handleLogin = () => {
    console.log(email, password );
    
    if(email === '' || password === ''){
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      console.log(users);
      const user = users.find(user => user.email === email);
      if(user){
        if(user.password === password){
          dispatch(setLogin(user));
          Alert.alert('Success', 'You have successfully logged in', [{ text: 'OK', onPress: () => { props.route.params.setUserLoggedIn()}}]);
        } else {
          Alert.alert('Error', 'Wrong password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    }
  }
 

  return (
   <>
      <StatusBar  translucent backgroundColor='transparent' />
    
      <View>
      <ImageBackground
        source={require('../assets/images/background-login.png')}
        blurRadius={3}
        style={styles.backgroundImage}
      >
         <View style={{flex: 0.6}}>
         {/* <Image
            source={require('../assets/images/logo-welcome.png')}
            //  style={{width: 200, height: 200, marginTop: 100}} 
             resizeMode="contain"
           >
           </Image> */}
           
        </View> 
        <Text style={[styles.text, {fontSize : 30, color : "#003f00"} ]}>Be Ready to {'\n'}Make new friends.</Text>
  
        <View style = {{   marginTop: 20, marginLeft: '10%', marginRight: '10%', marginBottom: '10%',}}>
        <Input
            placeholder="Email"
            placeholderTextColor={'white'}
            style = {{}}
            leftIcon={
              <Icon
                name="envelope"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            
            onChangeText={value => {setEmail(value)}}
            />
             <Input
            placeholder="Password"
            placeholderTextColor={'white'}
            leftIcon={
              <Icon name="lock" size={24} color="white"
              style={{ marginRight: 10 }} />
            }
            secureTextEntry={true}
            onChangeText={value => {setPassword(value)}}
            />
        </View>
        
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
      </ImageBackground>
      </View>
      </>
  )
}

export default LoginScreen;


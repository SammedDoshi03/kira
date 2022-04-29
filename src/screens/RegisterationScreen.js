import React, { useState} from 'react'
import { StyleSheet, SafeAreaView,Text, View, ImageBackground, Image, StatusBar, TouchableOpacity,Alert, Button } from 'react-native';
import { styles } from '../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox,TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { data } from "../components/countries";

const RegistrationScreen = (props) => {

    const {params} = props.route;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [country, setCountry] = useState('');
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = React.useState(false);
 
  const dispatch = useDispatch();

  const handleRegistration = () => {

    if (email === '' || password === '' || confirmPassword === '' || name === '' || country === '' || birthDate === '') {
        Alert.alert('Error', 'Please fill all the fields');
    } else if (!REGEX_MAIL.test(email)) {
        Alert.alert('Error', 'Please enter a valid email');
    } else if (!REGEX_PASSWORD.test(password)) {
        Alert.alert('Error', 'Please enter a valid password');
    } else if (password !== confirmPassword) {
        Alert.alert('Error', 'Password and Confirm Password does not match');
    } else if(!checked){
        Alert.alert('Error', 'Please confirm your age');
    } else if (birthDate.getFullYear() > 2004){
        Alert.alert('Error', 'Please enter a valid birth date');
    }
    else {
        birthDate = birthDate.getFullYear() + '-' + (birthDate.getMonth() + 1) + '-' + birthDate.getDate();
        // setBirthDate(birthDate.getFullYear()+'-'+birthDate.getMonth()+'-'+birthDate.getDate());
        dispatch(setUsers({ name, email, password,birthDate, country, isLogin: false }));
        Alert.alert('Success', 'You have successfully signed up', [{ text: 'OK', onPress: () => { props.navigation.navigate('Login') } }]);
    }
  }
 

  return (
   <>
      <StatusBar  translucent backgroundColor='transparent' />
      <View>
      <ImageBackground
        source={require('../assets/images/bg4.png')}
        blurRadius={2}
        style={styles.backgroundImage}
      >
         <View style={{flex: 0.6}}>
        </View> 
        <Text style={[styles.text, {fontSize : 30, color : "orange"} ]}>Be Ready to {'\n'}Make new friends.</Text>
  
        <View style = {{   marginTop: 20, marginLeft: '10%', marginRight: '10%', marginBottom: '10%',}}>
        <Input
            placeholder="Name"
            placeholderTextColor={'white'}
            style = {{}}
            leftIcon={
              <Icon
                name="user"
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
            }
            onChangeText={value => {setName(value)}}
            />
       
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
              <Input
            placeholder="Confirm Password"
            placeholderTextColor={'white'}
            leftIcon={
              <Icon name="lock" size={24} color="white"
              style={{ marginRight: 10 }} />
            }
            secureTextEntry={true}
            onChangeText={value => {setPassword(value)}}
            />
            <Button  title="Birthdate"  onPress={() => setOpen(true)} />
                <DatePicker modal mode='date' theme = "light"
                    open={open}  date={birthDate}
                    onConfirm={(date) => {
                        setOpen(false)
                        setBirthDate(date)
                        }}
                    onCancel={() => {
                        setOpen(false)
                        }}
                />
                
                <View style={{flexDirection: 'column'}}>
            <View style={{padding: 15 }}>
                <Dropdown
                    label="Choose your country"
                    data={data}
                    // enableSearch
                    theme={{
                        colors: {
                            primary: '#00bcd4',
                            text: '#fff',
                            placeholder: '#bdbdbd',
                            background: '#fff',
                            backdrop: '#fff',
                            selectedItem: '#00bcd4',
                        },
                    }}
                    value={country}
                    onChange={(value) => setCountry(value)}
                />
            </View>
              
            <View style={styles.checkBoxContainer}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    />
                    <Text  style={styles.checkBoxText}>I am over 18 years old</Text>
            </View>
            </View>
        </View>
        
          <TouchableOpacity onPress={handleRegistration}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>

      </ImageBackground>
      </View>
      </>
  )
}

export default RegistrationScreen;


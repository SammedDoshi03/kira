import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image,ScrollView, StatusBar,SafeAreaView ,TouchableOpacity , Pressable, Alert } from 'react-native';
// import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUsers } from '../redux/actions/usersActions';
// import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Checkbox,TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import { countries, data } from "../components/countries";




const SignUpScreen = (props) => {

    const {params} = props.route;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date(2000,1,1));
    const [country, setCountry] = useState('');
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = React.useState(false);

    const REGEX_MAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const dispatch = useDispatch();

    const handleSignUp = () => {
        console.log(birthDate.getFullYear());
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
            // birthDate = birthDate.getFullYear() + '-' + (birthDate.getMonth() + 1) + '-' + birthDate.getDate();
            // setBirthDate(birthDate.getFullYear()+'-'+birthDate.getMonth()+'-'+birthDate.getDate());
            dispatch(setUsers({ name, email, password,birthDate, country, isLogin: false }));
            Alert.alert('Success', 'You have successfully signed up', [{ text: 'OK', onPress: () => { props.navigation.navigate('Login') } }]);
        }
    }

    // const test = () => {
    //     props.navigation.navigate('Login');
    // }

  return (
    <>
     <StatusBar translucent backgroundColor='transparent' />
      {/* <StatusBar  barStyle = "default-content" hidden = {false} backgroundColor = "white" translucent = {true}/> */}
      <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../assets/images/signup.png')} style={styles.logo}/>
        <Text style = {styles.headerText}> Sign up</Text>
        </View>
       
        <View style={styles.body}>
            <View style={styles.SignUpButtons}>
                {/* <Text style={styles.text}>Sign up With </Text> */}
                <TouchableOpacity style={styles.SignUpButton}>
                    <Image source={require('../assets/images/google-logo.png')} style={styles.buttonLogo}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.SignUpButton}>
                    <Image source={require('../assets/images/facebook-logo.png')} style={styles.buttonLogo}/>
                </TouchableOpacity>
               
                <TouchableOpacity style={styles.SignUpButton}>
                    <Image source={require('../assets/images/apple-logo.png')} style={styles.buttonLogo}/>
                </TouchableOpacity>
            </View> 
             <ScrollView>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                    style={styles.inputField}
                    placeholder="Name"
                    returnKeyType="next"
                    placeholderTextColor = "black"
                    left={<TextInput.Icon name="home" />}
                    onChangeText={(text) => setName(text)} />
                    <TextInput
                    style={styles.inputField}
                    placeholder="Email" 
                    returnKeyType="next"
                    keyboardType='email-address'
                    placeholderTextColor = "black"
                    left={<TextInput.Icon name="email" />}
                    onChangeText={(text) => setEmail(text)} />
                    <TextInput 
                        style={styles.inputField} 
                        placeholderTextColor = "black"
                        placeholder="Password" 
                        secureTextEntry={true}
                    left={<TextInput.Icon name="lock" />}
                        onChangeText={(text) => setPassword(text)} />
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Confirm Password" 
                        placeholderTextColor = "black"
                        left={<TextInput.Icon name="security" />}
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmPassword(text)} />
                    <Button title="Birthdate" style={styles.birthDateButton} onPress={() => setOpen(true)} />
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
                        
                   <View style={styles.dropContainer}>
                        <Dropdown
                            label="Choose your country"
                            data={data}
                            // enableSearch
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
                    <Button  style={styles.submitButton} title="Sign Up" onPress={handleSignUp}/>
                </View>   
            </ScrollView> 
           
        </View>
     </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    body: {
        flex: 1.1,
        flexDirection: 'column',
    },
    logo: {
        width: 275,
        height: 275,
    },
    SignUpButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    SignUpButton: {
        backgroundColor: 'lightgrey',
        padding: 10,
    },

    buttonLogo: {
        width: 40,
        height: 40,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
    },
    inputFieldContainer: {
        width: '90%',
        // backgroundColor: 'grey',
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 5,
    },
    inputField: {
        height: 40,
        margin: 10,
        padding: 5,
        fontSize: 16,
        color: 'black',
        backgroundColor: 'transparent',
    },
    submitButton: {
        width: '90%',
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: '#000',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',   
        alignItems: 'center',
        marginTop: 10,
    },

    checkBoxText: {
      color: '#000',
    },
    birthDateButton: {
        backgroundColor : '#000',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 20,
        width: '90%',
    },

    dropContainer: {
        paddingTop: 15,
      },
});


export default SignUpScreen;
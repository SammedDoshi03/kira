import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';

import { useSelector } from 'react-redux';


import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store';

// Screens 
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Settings from './src/screens/Settings';


//Native Navigation
import { NavigationContainer } from '@react-navigation/native';
// Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// Drawer Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// Tab Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from './src/screens/RegisterationScreen';
const Tab = createBottomTabNavigator();

const AuthenticationScreens = (props) => (
  // <SafeAreaView  style={{ flex: 1 }}>
  <Stack.Navigator initialRouteName='welcome'>
     <Stack.Screen name='Welcome' component={WelcomeScreen}   initialParams={{ ...props }} options={{ headerShown: false }}  />
     <Stack.Screen name='Register' component={RegistrationScreen} initialParams={{ ...props }}  options={{ headerShown: false }}  />
     <Stack.Screen name='Sign Up' component={SignUpScreen} initialParams={{ ...props }}  options={{ headerShown: false }}  />
     <Stack.Screen name='Login' component={LoginScreen} initialParams={{ ...props }}  options={{ headerShown: false }} />
  </Stack.Navigator>
  // </SafeAreaView>
  )


const HomeScreens = (props) => (
  <Tab.Navigator 
  screenOptions={({ route }) => ({
    
    tabBarHideOnKeyboard: true,
    tabBarStyle : [
      {
        "display": "flex",
        // "marginBottom": 10,
      },
    ],
    tabBarIcon: ({ focused, color, size }) => {
      if (route.name === 'Home') {
        return (
          <MaterialIcons name={ focused ? "article" : 'article'} size={size} color={color}   />
        );
        
      } else if (route.name === 'Chat') { 
        return (
          <Ionicons name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} size={size} color={color}  />
        );
      } else if (route.name === 'Favorite') { 
        return (
          <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color}  />
        );
      } else if (route.name === 'Profile') { 
        return (
          <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color}  />
        );
      } else if (route.name === 'Settings') { 
        return (
          <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color}  />
        );
      }
      else if (route.name === 'About') {    
        return (
          <Ionicons name={focused ? 'desktop' : 'desktop-outline'} size={size} color={color}/>
        );
      }
    },
  tabBarInactiveTintColor: 'gray',
  tabBarActiveTintColor: 'tomato',
  
})}
>
  <Tab.Screen name="Home" component={HomeScreen}  initialParams={{ ...props }}  options={{ tabBarBadge: 3, headerShown: false }}/>
  <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
  <Tab.Screen name="Favorite" component={FavoriteScreen}   initialParams={{ ...props }}/>
  <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ ...props }} />
  <Tab.Screen name="Settings" component={Settings}   options={{ headerShown: false }} />
</Tab.Navigator> 

)

const Start = () => {

 const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const users = useSelector(state => state.users.users);

  const user = users.find(user => user.isLogin === true);
  console.log(users);
  // if(user !== undefined){
  //   setUserLoggedIn(true);
  //   console.log(isUserLoggedIn, " ");
    
  // }
    useEffect(() => {
      if(user !== undefined){
        setUserLoggedIn(true);
        console.log(isUserLoggedIn, " ");
      }
    }, [user]);
    return (
      <NavigationContainer>
        {
          !isUserLoggedIn ?
          <AuthenticationScreens setUserLoggedIn={() => setUserLoggedIn(true)} /> :
          <HomeScreens setUserLoggedIn={() => setUserLoggedIn(false)} />
        }
      </NavigationContainer>
    );
}
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Start/>
      </PersistGate>
    </Provider>
  )
};


export default App;

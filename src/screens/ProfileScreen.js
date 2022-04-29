import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-date-picker';

import { useSelector, useDispatch } from 'react-redux'
// import { styles } from '../assets/styles/styles'
import { setLogout } from '../redux/actions/usersActions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB, Portal, Provider } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import { setBirthDate } from '../redux/actions/usersActions';

const ProfileScreen = (props) => {

  const users = useSelector(state => state.users.users);
  // console.log(users);
  const user = users.find(user => user.isLogin === true);
  // const user = users[0];
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log("Calling onLogout");
    dispatch(setLogout(users[0]));
    props.route.params.setUserLoggedIn();
  }

  const [state, setState] = React.useState({ open: false });
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date(2000,1,1));

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const dateVariable = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();


  const changeBirthDate = () => {
    dispatch(setBirthDate(user, dateVariable));
  }


  return (
    
  // <>  
      
  //       <Button title="Logout" onPress={onLogout} />
         
  // </>
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>

              <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
                <View style = {{ height: "45%", alignContent: "center"}}>
                  <Text style= {{color: 'black', padding : 20, fontSize: 18}}>Pick your Birthdate</Text>
                  <DatePicker  mode='date' theme = "light"
                              open={open}  date={date}
                              onConfirm={(date) => {
                                  setOpen(false)
                                  setBirthDate(date)
                                  }}
                                  onDateChange={(date) => {
                                    setDate(date)
                                  }}
                            />
                    <Button buttonStyle={{margin:20, }} title="Confirm" onPress={() => {toggleOverlay(), changeBirthDate()}} />  
                </View>
              </Overlay>
            </View>
            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require("../assets/images/profile-pic.jpg")} style={[styles.image,{ borderRadius:20}]} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                {/* <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View> */}
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{user.name}</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{user.email}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{user.birthdate}</Text>
                    <Text style={[styles.text, styles.subText]}>Birthdate</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>{user.country}</Text>
                    <Text style={[styles.text, styles.subText]}>Country</Text>
                </View>
                {/* <View style={styles.statsBox}>  
                    <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                    <Text style={[styles.text, styles.subText]}>Following</Text>
                </View> */}
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
                <View style={styles.mediaCount}>
                    <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                </View>
            </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                        </Text>
                    </View>
                </View>
            </View>
            <Provider>
              <Portal>
                <FAB.Group
                  open={open}
                  icon={open ? 'folder-outline' : 'plus'}
                  actions={[
                    { icon: 'plus', onPress: () => console.log('Pressed add') },
                    {
                      icon: 'calendar-today',
                      label: 'Birthdate',
                      small: false,
                      onPress: () =>toggleOverlay(),
                    },
                    {
                      icon: 'logout-variant',
                      label: 'Logout',
                      onPress: () => onLogout(),
                      small: false,
                    },
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                      // do something if the speed dial is open
                    }
                  }}
                />
              </Portal>
            </Provider>
        </ScrollView>
      </SafeAreaView>
      );
      }


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined,
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      right: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});
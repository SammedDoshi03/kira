import React, { useState, useEffect } from "react";
import { ScrollView, View, Button, Text, StyleSheet, Image, StatusBar, FlatList } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux";
import ArticleComponents from "../components/ArticleComponents";


const HomeScreen = (props) => {

  const users = useSelector(state => state.users.users);
  // console.log(users);

  return (
    <>
  <ArticleComponents/>
   </>
  )

}


export default HomeScreen;
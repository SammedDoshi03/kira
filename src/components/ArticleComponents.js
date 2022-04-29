import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet, Image, StatusBar, FlatList } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux";
import { FAB, Headline  } from 'react-native-paper';
import { setArticles , setFavoriteArticles} from "../redux/actions/articlesActions";


const ArticleComponents = (props) => {
    const dispatch = useDispatch();
    const { route } = props;
    const allArticles = useSelector(state => state.articles.articles);
    // console.log(allArticles);
    
    const test = () => {
        console.log("Calling test");
        dispatch(setArticles(
          {
            id: 4,
            name: 'Article 4 ',
            description: 'Description 1',
            image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            isFavorite: false
          },
        )
      );
    }

    const test2 = (article) => {
        console.log("Calling test2");
        dispatch(setFavoriteArticles(article));
    }

    // const list = allArticles.map((art, index) => {
        // const { name, description, image, isLiked } = art;
        return (
          // test(),
            <>
             <Headline  style={styles.headline} >Today's Pick</Headline>
          <View style = {styles.ViewFlatList}>
          <FlatList
            data={allArticles}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image
                  }}
                />
                <View style={styles.flatListText}>
                  <Text style={styles.flatListTextTitle}>{item.name}</Text>
                  <Text style={styles.flatListTextDesciption}>{item.description}</Text>
                </View>
                <FAB
                    style={styles.fab}
                     small
                     animated = {true}
                     color = {item.isFavorite ? 'red':'#fff'}
                    icon="heart"
                    onPress={() => test2(item)}
                  />
              </View>
            )}
            // keyExtractor={item => item.id}
            horizontal={true}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex={allArticles.length - 1} 
          />
        </View>
        <Headline  style={styles.headline} >Favorites</Headline>
        <View style = {styles.ViewFlatList}>
          <FlatList
            data={allArticles}
            renderItem={({ item }) => (
              (item.isFavorite) ?
              <View style={styles.flatList}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image
                  }}
                />
                <View style={styles.flatListText}>
                  <Text style={styles.flatListTextTitle}>{item.name}</Text>
                  <Text style={styles.flatListTextDesciption}>{item.description}</Text>
                </View>
                <FAB
                    style={styles.fab}
                     small
                     animated = {true}
                     color = {item.isFavorite ? 'red':'#fff'}
                    icon="heart"
                    onPress={() => test2(item)}
                  />
              </View> : null
            )}
            // keyExtractor={item => item.id}
            horizontal={true}
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex={allArticles.length - 1} 
          />
        </View>
        </>
        )
   
}

const styles = StyleSheet.create({
    ViewFlatList : {
      flex: 0.5,
      marginTop: 10,
      marginStart: 10,
      marginEnd: 10,
    },
    flatList : {
      flex: 1,
      height: 275,
      width: 325,
      // flexDirection: "column",
      margin: 5,
      padding: 5,
      borderRadius: 10,
      backgroundColor: "white",
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    image : {
      height: "75%",
      borderRadius: 10,
      margin: 5,
    },
    flatListText : {
      flex: 1,
      flexDirection: "column",
      margin: 2,
      padding: 2,
      borderRadius: 10,
    },
    flatListTextTitle : {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
    flatListTextDesciption : {
      fontSize: 16,
      color: "black",
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    headline: {
      marginTop: 10,
      marginStart: 10,
      marginEnd: 10,
    }
  });

export default ArticleComponents
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation, StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const ImageScreen = ({navigation,route}) => {
    const {dispatch} = useNavigation();

  return (
    <View style={styles.wrapper}>
        <StatusBar hidden={true}/>
        <TouchableOpacity onPress={() => dispatch(StackActions.replace('Camera Screen'))} style={styles.backBTN}>
            <Ionicons name="ios-arrow-back-outline" size={35} color="#FFFFFF9E"/>
        </TouchableOpacity>
        <Image source={{uri:route.params.capturedPic }} style={{flex:1}}/> 
    </View>
  )
}

export default ImageScreen

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    backBTN:{
        width:30,height:30,
        position:"absolute",
        top:StatusBar.currentHeight+25,
        left:10,
        zIndex:9,
    }
})
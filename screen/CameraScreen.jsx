import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, StatusBar } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native';
import { Camera, CameraType, FlashMode } from "expo-camera"
import { Ionicons } from '@expo/vector-icons';
import CameraBTN from '../components/CameraBTN';
import { useIsFocused } from '@react-navigation/native';


export default function CameraScreen() {
    const [cameraPermision, setCameraPermision] = useState(false);
    const [flashStatus, setFlashStatus] = useState(false)
    const [mainCamera, setMainCamera] = useState(true)
    const [capturedPic, setCapturedPic] = useState(null)
    const cameraRef = useRef(null)
    const {navigate,dispatch} = useNavigation();

  
    useEffect(()=>{
      (async () => {
        const {status} =  await Camera.requestCameraPermissionsAsync()
        setCameraPermision(status === "granted")
      })()
    },[])

    const flashOnPress = () => {
      setFlashStatus(prev=>!prev)
    }

    const takePic = async () =>{
      if(cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync()
        setCapturedPic(photo.uri)
      }
    }
    const changeCamera = () => {
      setMainCamera(prev=>!prev)
    }

    const goToImageScreen = () => {
      if(capturedPic)dispatch(StackActions.replace('Image Screen', {capturedPic}))
    }
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
      {/*👇 Top Part*/}
        <View style={styles.topContainer}>
          <Ionicons name={flashStatus ? "flash" : "flash-off"} size={24} color="white" onPress={flashOnPress}/>
        </View>
      {/*👇 Mid Part ( Camera Area )*/}
        <View style={styles.midContainer}>
          {cameraPermision ? 
            <Camera 
              style={styles.cameraStyles}
              ref={cameraRef} 
              type={mainCamera ? CameraType.back : CameraType.front} 
              flashMode={flashStatus ? FlashMode.torch : FlashMode.off} 
              /> 
              : <Text>No Access</Text>}
          <Text style={{color:"#F7EA31B2"}}>PHOTO</Text>  
        </View>

      {/*👇 Bot Part*/}
        <View style={styles.botContainer}>
          {/* last taken picture 👇*/}
          <TouchableHighlight onPress={goToImageScreen}>
            {capturedPic ? 
            <Image source={{uri:capturedPic,width:50,height:50}} style={styles.caputerdImg}/> 
              : <View style={styles.caputerdImg}></View>}
          </TouchableHighlight>
          {/* Custom  btn  ( Take picture )👇*/}
          <CameraBTN takePicOnPress={takePic} />
          {/* Rotate camera btn  👇*/}
          <TouchableOpacity style={{backgroundColor:"#171a27",padding:5,borderRadius:20}} onPress={changeCamera}>
            <Ionicons name="ios-sync" size={30} color="white" />
          </TouchableOpacity>
        </View>

      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000FF',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop:5,
      paddingBottom:"15%",
    },
    topContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"start",
      alignItems:"start",
      paddingLeft:10,
      paddingRight:10,
      paddingTop:5
    },
    midContainer:{
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      rowGap:8,
      width:"100%",height:"70%"
    },
    botContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingLeft:10,
      paddingRight:10,
    },
    cameraStyles:{
      width:"100%",height:"95%"
    },
    caputerdImg:{
      width:50,height:50,
      borderWidth:0.3,
      borderColor:"#F7F7F76B",
      borderRadius:8
    }
})
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType, FlashMode } from "expo-camera"
import { Ionicons } from '@expo/vector-icons';
import CameraBTN from '../components/CameraBTN';



export default function CameraScreen() {
    const [cameraPermision, setCameraPermision] = useState(false);
    const [flashStatus, setFlashStatus] = useState(false)
    const [mainCamera, setMainCamera] = useState(true)
    const [capturedPic, setCapturedPic] = useState(null)
    const cameraRef = useRef(null)
  
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
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
      {/*👇 Top Part*/}
        <View style={styles.topContainer}>
          <Ionicons name={flashStatus ? "flash" : "flash-off"} size={24} color="white" onPress={flashOnPress}/>
        </View>

      {/*👇 Mid Part*/}
        <View style={styles.midContainer}>
          {cameraPermision ? 
            <Camera 
              style={{width:400,height:400}} 
              ref={cameraRef} 
              type={mainCamera ? CameraType.back : CameraType.front} 
              flashMode={flashStatus ? FlashMode.torch : FlashMode.off} 
              /> 
              : <Text>No Access</Text>}
          <Text style={{color:"#F7EA31B2"}}>PHOTO</Text>  
        </View>

      {/*👇 Bot Part*/}
        <View style={styles.botContainer}>
          {capturedPic ? 
            <Image source={{uri:capturedPic,width:50,height:50}} style={{borderWidth:0.3,borderColor:"#F7F7F76B",borderRadius:8}}/> 
              : <View style={{width:50,height:50,borderWidth:1,borderColor:"white"}}></View>}
          {/* custom  btn 👇*/}
          <CameraBTN takePicOnPress={takePic} />
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
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop:5,
      paddingBottom:"15%"
    },
    topContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"start",
      alignItems:"start",
      paddingLeft:10,
      paddingRight:10
    },
    midContainer:{
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      rowGap:8
    },
    botContainer:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingLeft:10,
      paddingRight:10,
    }
})
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'

const cameraWidth = 60 //👈adjust  camre size
const centerEl={
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}

const CameraBTN = ({takePicOnPress}) => {
  return (
    <TouchableOpacity onPress={takePicOnPress}>
        <View style={{width:cameraWidth,height:cameraWidth,backgroundColor:"white",borderRadius:cameraWidth/2,...centerEl}} on>
          <View style={{width:cameraWidth-5,height:cameraWidth-5,backgroundColor:"black",borderRadius:cameraWidth-6/2,...centerEl}}>
            <View style={{width:cameraWidth-11,height:cameraWidth-11,backgroundColor:"white",borderRadius:cameraWidth-20/2}}></View>
          </View>
        </View>
    </TouchableOpacity>
    )
}

export default CameraBTN

const styles = StyleSheet.create({})
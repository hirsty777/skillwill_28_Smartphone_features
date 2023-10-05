import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './screen/CameraScreen';
import ImageScreen from './screen/ImageScreen';

const Stack = createNativeStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName='Camera Screen'>
            <Stack.Screen name='Camera Screen' component={CameraScreen} options={{headerShown:false,freezeOnBlur:true}} />
            <Stack.Screen name='Image Screen' component={ImageScreen} options={{headerTitle:"",headerTransparent:true}}/>
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})
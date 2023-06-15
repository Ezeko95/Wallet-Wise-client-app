import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stackNavigator = createNativeStackNavigator();

import Login from '../components/Login/Login';
import HomeScreen from '../Screens/Home';
const Navigate = ()=> {
  return (
    <NavigationContainer>
        <stackNavigator.Navigator screenOptions={{
          headerShown: false, // Ocultar el encabezado de la pantalla
        }}>
            <stackNavigator.Screen name='Login' component={Login}/>
            <stackNavigator.Screen name='Home' component={HomeScreen}/>
        </stackNavigator.Navigator>
    </NavigationContainer>
  )
}

export default Navigate;

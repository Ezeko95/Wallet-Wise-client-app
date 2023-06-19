import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stackNavigator = createNativeStackNavigator();
import LoginButton from '../components/Login/Login';

import HomeScreen from '../Screens/Home';
import FormIncome from '../components/formIncome/FormIncome';

import SharedScreen from '../Screens/Shared';
const Navigate = () => {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        screenOptions={{
          headerShown: false, // Ocultar el encabezado de la pantalla
        }}>

            <stackNavigator.Screen name='Login' component={LoginButton}/>
            <stackNavigator.Screen name='Home' component={HomeScreen}/>
            <stackNavigator.Screen name='Shared' component={SharedScreen}/>
            <stackNavigator.Screen name='Form' component={FormIncome} />
        </stackNavigator.Navigator>

    </NavigationContainer>
  );
};

export default Navigate;

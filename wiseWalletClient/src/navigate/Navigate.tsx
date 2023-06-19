import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stackNavigator = createNativeStackNavigator();
import Pager from '../components/home/Pager';
import Slider from '../slider/Slider';
import HomeScreen from '../components/home/Home';
import SharedScreen from '../Screens/Shared';
import FormIncome from '../components/formIncome/FormIncome';
import MyTabs from '../tabs/Tabs';
import AuthView from '../Screens/Authenticate';

const Navigate = () => {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        screenOptions={{
          headerShown: false,
           // Ocultar el encabezado de la pantalla
        }}>
            {/* <stackNavigator.Screen name='Auth' component={AuthView}/> */}
            <stackNavigator.Screen name='Slider' component={Slider}/>
            <stackNavigator.Screen name='MyTabs' component={MyTabs}/>

        </stackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default Navigate;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const stackNavigator = createNativeStackNavigator();
import Slider from '../slider/Slider';
import MyTabs from '../tabs/Tabs';
import AuthView from '../Screens/Authenticate';
import Intro from '../components/Intro/Intro';
import Login from '../components/Login/Login';

const Navigate = () => {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
          screenOptions={{
            headerShown: false,
          }}>
            {/* <stackNavigator.Screen name='Intro' component={Intro}/> 
            <stackNavigator.Screen name='Login' component={AuthView}/>
            <stackNavigator.Screen name='Slider' component={Slider}/>  */}
            <stackNavigator.Screen name='MyTabs' component={MyTabs}/>
            
        </stackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default Navigate;

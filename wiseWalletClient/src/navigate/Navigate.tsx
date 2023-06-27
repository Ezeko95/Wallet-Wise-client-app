import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slider from '../slider/Slider';
import MyTabs from '../tabs/Tabs';
import AuthView from '../Screens/Authenticate';
import Intro from '../components/Intro/Intro';
import MyDrawer from '../components/drawer';
import FormPager from '../components/formIncome/Pager';
import Shared from '../Screens/Shared';
import { useRoute } from '@react-navigation/native';
import Pager from '../components/home/Pager';

type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Slider: undefined;
  MyDrawer: undefined;
  FormPager: undefined;
  Profile: undefined;
};

type SliderScreenRouteProp = RouteProp<RootStackParamList, 'Slider'>;

type Props = {
  route: SliderScreenRouteProp;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigate = () => {
  // const route= useRoute<ProfileScreenRouteProp>()
  // console.log(route,'ROUTE');
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={AuthView} /> 
        <Stack.Screen name="Slider" component={Slider} /> 
        <Stack.Screen name="MyDrawer" component={Pager} />
        
        <Stack.Screen name="FormPager" component={FormPager} />
        <Stack.Screen name='Profile' component={Shared}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
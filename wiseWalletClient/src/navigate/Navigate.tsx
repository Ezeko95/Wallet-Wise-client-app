import React from 'react';
import { NavigationContainer, RouteProp} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Slider from '../slider/Slider';
import MyTabs from '../tabs/Tabs';
import AuthView from '../Screens/Authenticate';
import Intro from '../components/Intro/Intro';
import MyDrawer from '../components/drawer';
import DetailIncome from '../components/home/DetailIncome';
import DetailExpense from '../components/home/DetailExpense'



type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  Slider: undefined;
  MyDrawer: undefined;
  DetailIncome: undefined;
};

type SliderScreenRouteProp = RouteProp<RootStackParamList, 'Slider'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailIncome'>;


export type Props = {
  route: SliderScreenRouteProp;
  routeDetail: DetailScreenRouteProp;
};;



const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={AuthView} /> 
        <Stack.Screen name="Slider" component={Slider} /> 
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="DetailIncome" component={DetailIncome} />
        {/* <Stack.Screen name="DetailExpense" component={DetailExpense} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigate;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormIncome from '../components/formIncome/FormIncome';
import { NavigationContainer } from '@react-navigation/native';
import SharedScreen from '../Screens/Shared';
import Pager from '../components/home/Pager';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Pager} />
        <Tab.Screen name="Add" component={FormIncome} />
        <Tab.Screen name="Shared" component={SharedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabs;

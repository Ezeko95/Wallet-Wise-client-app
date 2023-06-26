import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormIncome from '../components/formIncome/FormIncome';
import { NavigationContainer } from '@react-navigation/native';
import SharedScreen from '../Screens/Shared';
import Pager from '../components/home/Pager';
import { Colors } from '../enums/Colors';
import { View, Image} from 'react-native'


const Tab = createBottomTabNavigator();

const MyTabs = () => {
  
  return (

      <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveBackgroundColor: Colors.DETAIL_COLOR,
        tabBarActiveTintColor: Colors.BACKGROUND_COLOR,
        tabBarStyle: {
          backgroundColor: Colors.BACKGROUND_COLOR,
        }
      }}
      >
        <Tab.Screen 
          name="Add" 
          component={FormIncome} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image 
                    source={require('./assets/newIcon.png')}
                    resizeMode='contain'
                    style={{height: 45, tintColor:'white'}}
                  />
                </View>
              )
            }
          }}  
        />

        <Tab.Screen
            name="Home" 
            component={Pager} 
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View>
                    <Image 
                      source={require('./assets/homeIcon.png')}
                      resizeMode='contain'
                      style={{height: 60, tintColor:'white'}}
                    />
                  </View>
                )
              }
            }}
          />
        
        <Tab.Screen 
          name="Profile" 
          component={SharedScreen} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image 
                    source={require('./assets/profile.png')}
                    resizeMode='contain'
                    style={{height: 35, tintColor:'white'}}
                  />
                </View>
              )
            }
          }}
        />
        
      </Tab.Navigator>
    
  );
};

export default MyTabs;
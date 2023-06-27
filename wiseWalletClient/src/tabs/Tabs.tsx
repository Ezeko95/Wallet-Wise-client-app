import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormIncome from '../components/formIncome/FormIncome';
import { useNavigation } from '@react-navigation/native';
import SharedScreen from '../Screens/Shared';
import Pager from '../components/home/Pager';
import { Colors } from '../enums/Colors';
import { View, Image, Button,StyleSheet,TouchableOpacity, Text} from 'react-native'


const MyTabs = () => {
  
  const navigation:(any) = useNavigation()

  return (
    <View style={styles.viewButons} >
      <TouchableOpacity  onPress={()=> navigation.navigate('MyDrawer')} style={{backgroundColor:"black", height: 40, width: 120, alignItems:"center", margin:10, borderRadius: 8}}>
        <Text style={{ color : 'white'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('FormPager')} style={{backgroundColor:"black", height: 40,width: 100, alignItems:"center", margin:10, borderRadius: 8}}>
        <Text style={{ color : 'white'}}>Form</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={{backgroundColor:"black", height: 40,width: 100, alignItems:"center", margin:10, borderRadius: 8}}>
        <Text style={{ color : 'white'}}>Profile</Text>
      </TouchableOpacity>
   
    </View>
  );
};

export default MyTabs;

const styles = StyleSheet.create({
  viewButons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "green"
  }
})
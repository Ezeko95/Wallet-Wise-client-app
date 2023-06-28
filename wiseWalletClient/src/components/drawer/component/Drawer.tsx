import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { Colors } from '../../../enums/Colors';
import { useNavigation } from '@react-navigation/native';

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const navigation: any = useNavigation();

  const navigationView = () => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.text}
        onPress={() => drawer.current?.closeDrawer()}>
        <Image style={styles.burguerBtn} source={require('./closeX.png')}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('FormPager')}>
        <Text style={styles.text}>Add+</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Slider')}>
        <Text style={styles.text}>Currency</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      renderNavigationView={navigationView}>
      <TouchableOpacity
        style={styles.drawer}
        onPress={() => drawer.current?.openDrawer()}>
        <Image style={styles.burguerBtn} source={require('./burguerBtn.png')}/>
      </TouchableOpacity>
      {children}
    </DrawerLayoutAndroid>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  text: {
    color: Colors.TITLE_COLOR,
    fontSize: 20,
    marginBottom: 40,
    padding: 20,
  },
  drawer: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    height: 50,
  },
  burguerBtn: {
    top: 10,
    height:40,
    width: 40,
    resizeMode: 'contain',
    left: 20,
  }

});
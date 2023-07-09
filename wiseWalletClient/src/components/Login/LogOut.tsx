import { Button, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { useAppDispatch } from '../../redux/store';
import { cleanAllMovements } from '../../redux/slices/allMovementsSlice';
const LogoutButton = () => {
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useAppDispatch();

  const navigation: any = useNavigation();
  const onPress = async () => {
    try {
      setShowLoader(true);
      await AsyncStorage.removeItem('accessToken');
      console.log(dispatch(cleanAllMovements()));
      console.log('Elemento eliminado de AsyncStorage');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al eliminar el elemento de AsyncStorage:', error);
    }
  };

  return (
    <>
      <View style={{ alignSelf: 'center', width: '50%', marginTop: 50 }}>
        <TouchableOpacity onPress={() => onPress()} style={styles.buton}>
          <Text style={{ color: 'white', fontSize: 25 }}>Log Out </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buton}
          onPress={() => navigation.navigate('ToPremium')}>
          <Text style={{ color: 'white', fontSize: 25 }}>Premium</Text>
        </TouchableOpacity>
      </View>

      {showLoader && <Loader />}
    </>
  );
};
export default LogoutButton;

const styles = StyleSheet.create({
  buton: {
    backgroundColor: '#31316d',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
});

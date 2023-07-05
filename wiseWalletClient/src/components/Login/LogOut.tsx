import { Button, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
const LogoutButton = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [accesToken, setAccessToken] = useState<boolean>(false);

  const navigation: any = useNavigation();
  const onPress = async () => {
    try {
      setShowLoader(true);
      await AsyncStorage.removeItem('accessToken');
      console.log('Elemento eliminado de AsyncStorage');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al eliminar el elemento de AsyncStorage:', error);
    }
  };

  // useEffect(() => {
  //   const fetchAccesToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('accessToken');
  //       if (token) {
  //         setAccessToken(true);
  //       } else {
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchAccesToken();
  // }, [accesToken]);

  // useEffect(() => {
  //   if (showLoader) {
  //     setTimeout(() => {
  //       setShowLoader(false);
  //     }, 3000); // Duración de 3 segundos
  //   }
  // }, [showLoader]);
  // console.log(
  //   'ACCES TOKEN DESPUES DEL LOG OUT',
  //   AsyncStorage.getItem('AccessToken'),
  // );

  return (
    <>
      <View style={{ marginTop: 60, width: '90%', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => onPress()} style={styles.buton}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}>
            Log Out{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buton}
          onPress={() => navigation.navigate('ToPremium')}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 25 }}>
            Premium 👑
          </Text>
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
});

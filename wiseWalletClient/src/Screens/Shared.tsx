import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { base_URL } from '../redux/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { Users } from '../redux/interfaces/Interface';



const SharedScreen = () => {
  
  const [userId, setUserId] = useState({});

  const [user, setUser] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const tokenParts: string[] = accessToken.split('.');
          const payload = JSON.parse(
            Buffer.from(tokenParts[1], 'base64').toString('utf-8')
          );
          const userId = payload.user.id;
          setUserId(userId);
          console.log(userId)
          let rep = await axios.get(`${base_URL}/user/${userId}`).then(response=> response.data);
          setUser(rep);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(user);
  
  return (
    <View style={styles.sharedCard}>
      <Image source={require('../components/Login/assets/avatar.png')}style={styles.image}/>
     <Text style={styles.text}>{user.name}</Text>
     <Text style={styles.text}>{user.email}</Text>
     {
      user.premium === false ? <Text style={styles.text}>Usuario No Premium</Text>: <Text style={styles.text}>Premium</Text>
     }
    </View>
  );
};

const styles = StyleSheet.create({
  image:{
    width: 200,
    height: 200,
    borderRadius: 300
  },
  sharedCard: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#101c53',
  },
  text: {
    color:"white"
  }
});

export default SharedScreen;
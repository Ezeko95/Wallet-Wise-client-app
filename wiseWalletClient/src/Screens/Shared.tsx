import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { gettingUsers } from '../redux/features/getUser';

const SharedScreen = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(gettingUsers())
  },[])
  const state = useAppSelector(state=> state.user.user);
  const tp = state.slice(0,1)
  return(
    <View style={styles.sharedCard}>
      {
        state.length === 0 ? <Text>CARGANDO PERFIL....</Text>:
        state.map((item,index)=>{
          return(
            <View style={styles.sharedCard} key={index}>
             <Image source={{uri: `${item.payload.user.picture}`}} style={styles.image}/>
              <Text style={{color: "white"}}>{item.payload.user.name}</Text>
              <Text style={{color: "white"}}>{item.payload.user.email}</Text>
              {item.payload.user.premium  === false ? <Text style={{color: "white"}}>Cuenta Standard</Text>: <Text style={{color: "white"}}>Cuenta premium</Text>}
            </View>
          )
        })
      }
    </View>
  )
};

const styles = StyleSheet.create({
  image:{
    width: 200,
    height: 200,
    borderRadius: 100
  },
  sharedCard: {
    flex: 1,
    backgroundColor: '#101c53',
    
  },
  text: {
    color:"white",
    padding: 12
  }
});

export default SharedScreen;
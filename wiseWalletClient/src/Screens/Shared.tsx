import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView , Button} from 'react-native';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { gettingUsers } from '../redux/slices/getUsers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoutButton from '../components/Login/LogOut';

const SharedScreen = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(gettingUsers())
  },[])
  const state = useAppSelector(state=> state.user.user);
  const tp = state[state.length-1]
  console.log(tp);
  
  return(
    <View style={styles.sharedCard}>
    <View style={styles.perfiView}>
      

    <View style={styles.perfiView} key={tp.payload.user.id}>
             <Image source={{uri: `${tp.payload.user.picture}`}} style={styles.image}/>
              <Text style={{color: "white"}}>{tp.payload.user.name}</Text>
              <Text style={{color: "white"}}>{tp.payload.user.email}</Text>
              {tp.payload.user.premium  === false ? <Text style={{color: "white"}}>Cuenta Standard</Text>: <Text style={{color: "white"}}>Cuenta premium</Text>}
    </View>
       
    </View>
    <View>
    <LogoutButton/>
    </View>
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
    justifyContent: "space-around",
    backgroundColor: '#101c53',
  },
  text: {
    color:"white",
    padding: 12
  },
  perfiView:{
    height: 200,
    width: 400,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SharedScreen;
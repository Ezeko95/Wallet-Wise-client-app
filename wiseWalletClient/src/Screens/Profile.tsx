import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { gettingUsers } from '../redux/slices/getUsers';
import LogoutButton from '../components/Login/LogOut';
import Drawer from '../components/drawer/component/Drawer';
import MyTabs from '../tabs/Tabs';

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
                <Text style={{color: "white", fontSize: 39}}>{tp.payload.user.name}</Text>
                <Text style={{color: "white",  fontSize: 19}}>{tp.payload.user.email}</Text>
                {tp.payload.user.premium  === false ? <Text style={{color: "white"}}>Cuenta Standard</Text>: <Text style={{color: "black"}}>Cuenta premium</Text>}
            </View>   
          </View>
          <View style={styles.stylesBtn}>
            <LogoutButton/>
          </View>
        </View>
  )
};
export default SharedScreen;
const styles = StyleSheet.create({
  image:{
    width: 150,
    height: 150,
    borderRadius: 100
  },
  sharedCard: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#131313",
    alignSelf:"center"
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
    alignItems: "center",
  },
  stylesBtn:{
    justifyContent:"center",
    alignItems:"center",
  }
});
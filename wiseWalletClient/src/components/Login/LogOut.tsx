import { Button , TouchableOpacity, Text, StyleSheet, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { useAppSelector } from '../../redux/store';
import { ScrollView,Image } from 'react-native';
const LogoutButton = () => {
  const navigation: any = useNavigation();
  const state = useAppSelector(state => state.user.user);
  const tp = state[state.length - 1];
  const results = tp.payload.user.id;

    const onCheckout = async () => {
        try {
          //create payment intent
          const { data } = await axios.post(`${base_URL}/payment/intent`, {
            amount: Math.floor(10 * 100),
          });
          //initialize payment sheet
          const initResponse = await initPaymentSheet({
            merchantDisplayName: 'wiseWallet',
            paymentIntentClientSecret: data.paymentIntent,
            defaultBillingDetails: {
              name: 'Fabian Garcia Test',
            },
          });
          if (initResponse.error) {
            Alert.alert('Something went wrong');
            return;
          }
    
          //present payment sheet
          const payment = await presentPaymentSheet();
          if (payment.error) {
            Alert.alert('Something went wrong');
            return;
          }
          //logica para hacer premium al usuario
          
          navigation.navigate('Premium');
        } catch (err) {
          console.log('err intent', err);
        }
    }
    const onPress = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            console.log('Elemento eliminado de AsyncStorage');
            navigation.navigate('Login')
          } catch (error) {
            console.log('Error al eliminar el elemento de AsyncStorage:', error);
          }
    };
   
    return(

        <View style={{marginTop: 60, width: '90%', justifyContent: 'center'}}>

        <TouchableOpacity onPress={onPress} style={styles.buton}>
           <Text style={{color: "white", textAlign: "center", fontSize: 25}}>LOGOUT</Text>
        </TouchableOpacity>
        {
          tp.payload.user.premium === true
          ?null :
          <TouchableOpacity style={styles.buton} onPress={()=>{
            onCheckout()
        }}>
        <Text style={{color: "white", textAlign: "center", fontSize: 25}}>Premium 👑</Text>
        </TouchableOpacity>
        }
        {
          tp.payload.user.premium
          ?
          <>
          <TouchableOpacity onPress={onPress} style={styles.buton}>
            <Text style={{color: "white", textAlign: "center", fontSize: 25}}>Shared Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.buton}>
          <Text style={{color: "white", textAlign: "center", fontSize: 25}}>Goals</Text>
          </TouchableOpacity>
        </>
          :
          null
        }
       
        </View>
    )
}
export default LogoutButton;

const styles = StyleSheet.create({
    buton:{
        backgroundColor: "#31316d",
        height: 50,
        justifyContent: "center", alignItems:"center",
        margin: 6,
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'white'
    }
})
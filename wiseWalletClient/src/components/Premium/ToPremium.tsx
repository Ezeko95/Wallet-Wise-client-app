import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { base_URL } from '../../redux/utils';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const ToPremium = () => {
  const navigation: any = useNavigation();

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
  };
 
  return (
    <ScrollView>
    <View style={{justifyContent:"center", alignItems:"center"}}>
      <Image style={{width: '100%'}} source={require("./assets/premium.png")}/>
      <Image style={{width: '100%'}} source={require("./assets/premium2.png")}/>
      <TouchableOpacity style={style.botonOferta} onPress={()=>{
        onCheckout()
      }}>
        <Text  style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center', width: 500}}>Go Premium!</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  botonOferta:{
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#F1CC7A',
  }
});

export default ToPremium;
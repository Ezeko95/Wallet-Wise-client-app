import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppSelector } from '../redux/store';
import { useAppDispatch } from '../redux/store';
import { gettingUsers } from '../redux/slices/getUsers';
import LogoutButton from '../components/Login/LogOut';
import Drawer from '../components/drawer/component/Drawer';
import MyTabs from '../tabs/Tabs';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';
import { base_URL } from '../redux/utils';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const Profile = () => {
  const [openModal, setOpenModal] = useState(true);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.user.user);
  const tp = state[state.length - 1];
  const results = tp.payload.user.id;

  useEffect(() => {
    dispatch(gettingUsers());
  }, [tp.payload.user.premium]);
  console.log(tp);

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
    <ImageBackground
      style={{ height: '100%', width: '100%' }}
      source={require('./images/bgProfile.png')}>
                          <View style={{ alignSelf: 'flex-start'}}>
                            <Drawer />
                          </View>
        <ScrollView>

      <View style={styles.perfiView}>
        {openModal && tp.payload.user.premium === false ? (
          <View>
            <Modal visible={openModal} animationType="slide" transparent={true}>
              <View style={styles.modal}>
                 
                  <View>
                    <TouchableOpacity
                      style={{ height: 40, width: '70%', alignSelf: 'center', backgroundColor: 'white', borderRadius: 10, bottom: '15%', borderWidth: 2, borderColor: '#C0944D'}}
                      onPress={() => setOpenModal(false)}>
                      <Text style={{ color: '#C0944D', fontSize: 30, fontWeight: 'bold', textAlign: 'center', bottom: 3 }}> X </Text>
                    </TouchableOpacity>
                  </View>
                <Image style={{alignItems: 'center', alignSelf: 'center', borderRadius: 10}} source={require('./images/GoPremium1.png')} />

                    <View style={{}}>
                      <TouchableOpacity style={{ padding: 10, backgroundColor: '#C0944D', borderRadius: 10, justifyContent: 'center', width: '70%', alignSelf: 'center', top: '15%', borderWidth: 2, borderColor: 'white'}}
                        onPress={() => {
                          onCheckout();
                        }}>

                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                          Go Premium
                        </Text>
                      </TouchableOpacity>
                    </View>
                
                
              </View>
            </Modal>
          </View>
        ) : null}
        <View style={styles.perfiView} key={tp.payload.user.id}>
          <Image
            source={{ uri: `${tp.payload.user.picture}` }}
            style={styles.image}
            />
          <Text style={{ color: 'white', fontSize: 39 }}>
            {tp.payload.user.name}
          </Text>
          <Text style={{ color: 'white', fontSize: 19 }}>
            {tp.payload.user.email}
          </Text>
          {tp.payload.user.premium === false ? (
            <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>
              Standard account
            </Text>
          ) : (
            <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>
              👑Premium account👑
            </Text>
          )}
        </View>
      </View>
      <View style={styles.stylesBtn}>
        <LogoutButton />
      </View>
          </ScrollView>
    </ImageBackground>
  );
};
export default Profile;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#0e2235c1',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
    
   
   
   
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
  },

  text: {
    color: 'white',
    padding: 12,
  },
  perfiView: {
    height: 330,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D2FE4',
    borderBottomEndRadius: 60,
    borderBottomStartRadius: 60,
  },
  stylesBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    
    
  },
});

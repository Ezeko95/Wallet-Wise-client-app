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
const SharedScreen = () => {
  const [openModal, setOpenModal] = useState(true);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(gettingUsers());
  }, []);
  const state = useAppSelector(state => state.user.user);
  const tp = state[state.length - 1];
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
    <View style={styles.sharedCard}>
      <View style={styles.perfiView}>
        {openModal && (
          <View>
            <Modal visible={openModal} animationType="slide" transparent={true}>
              <View style={styles.modal}>
                <ImageBackground source={require('./images/GoPremium.png')}>
                  <View style={styles.modalBi}>
                    <TouchableOpacity
                      style={{ height: 40, width: 39 }}
                      onPress={() => setOpenModal(false)}>
                      <Text
                        style={{
                          color: 'white',
                          right: 20,
                          bottom: 40,
                          fontSize: 30,
                        }}>
                        X
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: 200,
                        backgroundColor: '#0e2235f6',
                        top: 200,
                        left: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        onCheckout();
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          textAlign: 'center',
                        }}>
                        Go Premium
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </Modal>
          </View>
        )}
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
            <Text style={{ color: 'white' }}>Cuenta Standard</Text>
          ) : (
            <Text style={{ color: 'black' }}>Cuenta premium</Text>
          )}
        </View>
      </View>
      <View style={styles.stylesBtn}>
        <LogoutButton />
      </View>
    </View>
  );
};
export default SharedScreen;
const styles = StyleSheet.create({
  modalBi: {
    height: 300,
    width: 300,
    borderRadius: 20,
  },
  modal: {
    backgroundColor: '#0e2235c1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  sharedCard: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#131313',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    padding: 12,
  },
  perfiView: {
    height: 200,
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stylesBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

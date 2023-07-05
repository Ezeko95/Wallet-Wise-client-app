import React, { useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Colors } from '../../../enums/Colors';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../redux/store';

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = () => {
  const navigation: any = useNavigation();
  const [modal, setModal] = useState<boolean>(false);
  const state = useAppSelector(state => state.user.user);
  const tp = state[state.length - 1];

  return (
    <View>
    
      <TouchableOpacity style={styles.drawer} onPress={() => setModal(true)}>
        <Image style={styles.burguerBtn} source={require('./burguerBtn.png')} />
      </TouchableOpacity>

      {modal && (
        <View>
          <Modal visible={modal} animationType="fade" transparent={true}>
            <View
              style={{
                backgroundColor: Colors.DETAIL_COLOR,
                width: '50%',
                height: '100%',
                borderTopEndRadius: 15,
                borderBottomEndRadius: 15,
                borderWidth: 1.5,
                borderColor: Colors.BACKGROUND_COLOR
              }}>
              <TouchableOpacity
                style={styles.x}
                onPress={() => setModal(false)}>
                <Image
                  style={styles.burguerBtn}
                  source={require('./closeX.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {navigation.navigate('Profile')}}>
                <View style={{flexDirection: "row", backgroundColor:Colors.BACKGROUND_COLOR, marginHorizontal:"3%", borderRadius:5}}>  
                  <Image
                    source={{ uri: `${tp.payload.user.picture}` }}
                    style={styles.image}
                  />
                  <Text style={styles.textUser}>{tp.payload.user.name}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Slider');
                  setModal(false);
                }}>
                <Text style={styles.text}>New Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('GoalsList');
                  setModal(false);
                }}>
                <Text style={styles.text}>My Goals</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SharedList');
                  setModal(false);
                }}>
                <Text style={styles.text}>Shared</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}

    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  text: {
    color: Colors.BACKGROUND_COLOR,
    fontSize: 20,
    marginTop: 17,
    marginBottom: 17,
    padding: 8,
    marginLeft: 15,
  },
  textUser:{
    color: "white",
    fontSize: 20,
    marginTop: 17,
    marginBottom: 17,
    padding: 8,
    marginLeft: 10,
    fontWeight:'bold'
  },
  drawer: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    height: 50,
  },
  burguerBtn: {
    top: 10,
    height: 40,
    width: 40,
    resizeMode: 'contain',
    left: 20,
  },
  x: {
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 17,
    marginBottom: 17,
    marginLeft: 15,
  },
});

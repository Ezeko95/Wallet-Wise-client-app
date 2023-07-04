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

interface DrawerProps {
  children: React.ReactNode;
}

const Drawer = () => {
  const navigation: any = useNavigation();
  const [modal, setModal] = useState<boolean>(false);


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
    marginTop: 20,
    marginBottom: 20,
    padding: 8,
    marginLeft: 20,
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
});

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {
  getAllRooms,
  getDetail,
  setRoomId,
} from '../../redux/slices/sharedSlice';

const SharedList: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(state => state.share.allRooms);
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);

  const showRoom = rooms.filter(e => e.deletedShared === false);
  console.log(ide[ide.length - 1], 'ide en sharedlist');
 
  useEffect(() => {
    dispatch(getAllRooms(ide[ide.length - 1]));
  }, []);

  console.log('ROOMS', rooms);
  console.log('SHOW ROOM', showRoom);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          paddingVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
          <Text style={styles.goBack}>{'<'}</Text>
        </TouchableOpacity>
        <View
          style={{
            marginStart: 30,
            flexDirection: 'row',
            width: '80%',
            alignContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'white',
              fontWeight: 'bold',
              left: -15,
            }}>
            Shared
            <Text style={{ color: 'yellow' }}> Rooms</Text>
          </Text>
        </View>
      </View>

      <View style={styles.allItems}>
        <TouchableOpacity
          style={styles.create}
          onPress={() => navigation.navigate('NewShared')}>
          <Text style={{ color: '#A16AE2', fontSize: 30, fontWeight: 'bold' }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      {rooms.length > 0 && (
        <ScrollView bounces={true}>
         
          {showRoom.length > 0 &&
            showRoom.map((room, index) => {
              return (
                <View key={index} style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.roomTouchable}
                    onPress={() => {
                      dispatch(setRoomId(room.id));
                      dispatch(getDetail(room.id));
                      navigation.navigate('SharedDetail');
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                      }}>
                      <Text
                        style={{
                          paddingStart: 20,
                          alignSelf: 'center',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        {room.name}
                      </Text>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: Colors.BACKGROUND_COLOR,
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          marginEnd: 3.5,
                          marginTop: 3.5,
                        }}>
                        <Text style={{ textAlign: 'center', color: 'yellow' }}>
                          Participants
                        </Text>
                        <Text style={{ textAlign: 'center', color: 'yellow' }}>
                          {+room.participants.length + 1}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default SharedList;

const styles = StyleSheet.create({
  roomTouchable: {
    width: '90%',
    backgroundColor: Colors.DETAIL_COLOR,
    margin: 5,
    borderRadius: 15,
    height: 50,
  },
  container: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  create: {
    backgroundColor: 'darkslateblue',
    borderRadius: 15,
    width: '95%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A16AE2',
    borderWidth: 1,
    position: 'relative',
    margin: 5,
    marginBottom: 20,
  },
  allItems: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    alignSelf: 'flex-start',
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    width: 40,
    height: 40,
    borderColor: '#FFF7AE',
    borderWidth: 2,
    marginHorizontal: 10,
  },
});

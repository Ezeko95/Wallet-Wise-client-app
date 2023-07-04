import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '../../enums/Colors';
import { postExpense } from '../../redux/slices/expenseSlice';
import { base_URL } from '../../redux/utils';
import axios from 'axios';
import { AccountData } from '../home/AllMovements';
import { SelectCountry } from 'react-native-element-dropdown';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { getAllRooms } from '../../redux/slices/sharedSlice';

const SharedDetail: React.FC = () => {
  const navigation: any = useNavigation();
  const detail: any = useAppSelector(state => state.share.detail);
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.allMovements.accounts);
  const [accountShared, setAccountShared] = useState<string>('');
  const [closeShared, setCloseShared] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const data: AccountData[] = [];

  accounts.forEach((a: string) => {
    data.push({
      label: a,
      value: a,
    });
  });

  const handleSoftDelete = async () => {
    const expenseShared = {
      category: 'Shared',
      description: detail.name,
      amount: detail.personalExpense,
      paymentMethod: accountShared,
    };
    Alert.alert('Expense added successfully');
    dispatch(postExpense(ide[ide.length - 1], expenseShared));
    await axios.put(`${base_URL}/shared/${detail.id}`);
    navigation.navigate('SharedList');
    dispatch(getAllRooms(ide[ide.length - 1]));
  };

  const handleDelete = async () => {
    await axios.delete(`${base_URL}/shared/${detail.id}`);
    dispatch(getAllRooms(ide[ide.length - 1]));
    navigation.navigate('SharedList');
  };

  interface labels {
    name: String;
    amount: number;
    difference: number;
  }

  const arrayRender: labels[] = [
    {
      ['name']: 'You',
      ['amount']: detail.personalExpense,
      ['difference']: parseFloat(
        (
          detail.personalExpense -
          detail.total / (detail.participants.length + 1)
        ).toFixed(2),
      ),
    },
  ];

  detail.participants.map((data: any) => {
    arrayRender.push({
      ['name']: data.name,
      ['amount']: data.expense,
      ['difference']: parseFloat(
        (
          data.expense -
          detail.total / (detail.participants.length + 1)
        ).toFixed(2),
      ),
    });
  });

  arrayRender.sort((a: any, b: any) => {
    if (a.amount < b.amount) return 1;
    if (a.amount > b.amount) return -1;
    return 0;
  });

  console.log('array a renderizar', arrayRender);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SharedList');
            dispatch(getAllRooms(ide[ide.length - 1]));
          }}>
          <Text>{'<'}</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignContent: 'center',
          }}>
          <Text style={styles.roomTitle}>Room: </Text>
          <Text style={{ fontSize: 30, color: 'yellow', fontWeight: 'bold' }}>
            "{detail.name}"
          </Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: Colors.DETAIL_COLOR,
            padding: 5,
            width: '100%',
          }}>
          <View style={{ width: '25%' }}>
            <Text style={styles.titles}>Participants</Text>
            <Text style={styles.subtitles}>
              {+detail.participants.length + 1}
            </Text>
          </View>
          <View style={{ width: '25%' }}>
            <Text style={styles.titles}>Total</Text>
            <Text style={styles.subtitles}>$ {detail.total}</Text>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={styles.titles}>P/Person</Text>
            <Text style={styles.subtitles}>
              $ {(detail.total / (detail.participants.length + 1)).toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'yellow',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                paddingBottom: 15,
                paddingVertical: 10,
                width: '45%',
                textAlign: 'center',
              }}>
              name
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                paddingBottom: 15,
                paddingVertical: 10,
                width: '25%',
                textAlign: 'center',
              }}>
              amount
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                paddingBottom: 15,
                paddingVertical: 10,
                width: '25%',
                textAlign: 'center',
              }}>
              diff.
            </Text>
          </View>
          {arrayRender.map((element: labels, index: number) => {
            return (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  backgroundColor: Colors.DETAIL_COLOR,
                  width: '100%',
                  margin: 5,
                  padding: 5,
                  alignSelf: 'center',
                }}
                key={index}>
                <View style={{ width: '45%', borderRadius: 5 }}>
                  {element.name === 'You' ? (
                    <Text
                      style={{
                        color: 'yellow',
                        padding: 3,
                        margin: 5,
                        fontSize: 20,
                      }}>
                      {element.name}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'white',
                        padding: 3,
                        margin: 5,
                        fontSize: 20,
                      }}>
                      {element.name}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    width: '25%',
                    backgroundColor: 'white',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      padding: 3,
                      margin: 5,
                      alignSelf: 'flex-end',
                      fontSize: 18,
                    }}>
                    ${element.amount}
                  </Text>
                </View>

                <View
                  style={{
                    width: '25%',
                    backgroundColor: 'white',
                    borderRadius: 5,
                  }}>
                  {element.difference > 0 ? (
                    <Text
                      style={{
                        color: 'green',
                        padding: 3,
                        margin: 5,
                        alignSelf: 'flex-end',
                        fontSize: 18,
                      }}>
                      ${element.difference}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: 'red',
                        padding: 3,
                        margin: 5,
                        alignSelf: 'flex-end',
                        fontSize: 17,
                      }}>
                      ${element.difference}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setCloseShared(true);
            dispatch(getAccounts(ide[ide.length - 1]));
          }}
          style={styles.touchableOpacity}>
          <Text style={styles.textFinish}>Close & add expense on balance </Text>
        </TouchableOpacity>
        {closeShared && (
          <View>
            <SelectCountry<AccountData>
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              maxHeight={200}
              value={paymentMethod}
              data={data}
              valueField="value"
              labelField="label"
              imageField="image"
              placeholder="Select Account"
              onChange={value => setAccountShared(value.value)}
            />
            <TouchableOpacity onPress={() => handleSoftDelete()}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            handleDelete();
          }}
          style={styles.touchableOpacity}>
          <Text style={styles.textFinish}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SharedDetail;

const styles = StyleSheet.create({
  titles: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderLeftColor: 'grey',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    backgroundColor: Colors.BACKGROUND_COLOR,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitles: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  roomTitle: {
    alignSelf: 'center',
    color: 'white',
    marginStart: 20,
    fontSize: 30,
    height: 40,
    fontWeight: 'bold',
  },
  container: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFinish: {
    display: 'flex',
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: 15,
    width: 150,
    height: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  touchableOpacity: {
    margin: 5,
    height: 50,
  },
  dropdown: {
    margin: 16,
    height: 40,
    width: 200,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    padding: 15,
  },
  imageStyle: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

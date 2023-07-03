import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import {
  View,
  Text,
  TextInput,
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

  const detail = useAppSelector(state => state.share.detail);
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(state => state.allMovements.accounts);
  const [accountShared, setAccountShared] = useState<string>('');
  const [closeShared, setCloseShared] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  detail.participants.map(e => console.log(e.expense));

  const data: AccountData[] = [];

  accounts.forEach((a: string) => {
    data.push({
      label: a,
      value: a,
    });
  });

  console.log(accounts, 'AAAACCCOOOUUUNNTS');
  console.log(data, 'DDDDDDDDDAAAAAAAAAAAATTTTTTTTTTTAAAAAAAAAAAAA');

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
  };

  const handleDelete = async () => {
    await axios.delete(`${base_URL}/shared/${detail.id}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SharedList');
          dispatch(getAllRooms(ide[ide.length - 1]));
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text
          style={{
            backgroundColor: 'red',
            justifyContent: 'space-around',
            alignContent: 'center',
            fontSize: 25,
          }}>
          Room {detail.name}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: 'darkblue',
            width: 300,
          }}>
          <View>
            <Text style={styles.titles}>Participants</Text>
            <Text style={styles.subtitles}>
              {+detail.participants.length + 1}
            </Text>
          </View>
          <View>
            <Text style={styles.titles}>Total</Text>
            <Text style={styles.subtitles}>$ {detail.total}</Text>
          </View>
          <View>
            <Text style={styles.titles}>P/Person</Text>
            <Text style={styles.subtitles}>
              $ {detail.total / (detail.participants.length + 1)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View>
        <View>
          <Text>My expense</Text>
          <Text>{detail.personalExpense}</Text>
          <Text>
            {detail.personalExpense -
              detail.total / (detail.participants.length + 1)}
          </Text>
        </View>
        {detail.participants.map((part, index) => {
          return (
            <View key={index}>
              <Text>{part.name}</Text>
              <Text>{part.expense}</Text>
              <Text>
                {part.expense - detail.total / (detail.participants.length + 1)}
              </Text>
            </View>
          );
        })}
      </View>
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
    backgroundColor: Colors.BACKGROUND_COLOR,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitles: {
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textFinish: {
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: 15,
    width: 85,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    marginBottom: 15,
  },
  touchableOpacity: {
    width: 100,
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

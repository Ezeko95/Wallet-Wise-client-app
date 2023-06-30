import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { base_URL } from '../../redux/utils';
import axios from 'axios';
import { IGoal } from './GoalsList';
import { getAllGoals, getDetail } from '../../redux/slices/goalSlice';
import { postExpense } from '../../redux/slices/expenseSlice';
import {
  getMovements,
  getAccounts,
  getIncome,
  getExpense,
} from '../../redux/slices/allMovementsSlice';
import { SelectCountry } from 'react-native-element-dropdown';
//import { paymentMethodX, PaymentMethod } from '../formIncome/Pager';
import { AccountData } from '../home/AllMovements';
import { Colors } from '../../enums/Colors';
import { useNavigation } from '@react-navigation/native';

interface Props {
  id: number;
}

interface IDetail {
  name: string;
}

const GoalDetail: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const idGoal = useAppSelector(state => state.goal.goalId);
  const detail = useAppSelector(state => state.goal.detail);
  const accounts = useAppSelector(state => state.allMovements.accounts);

  const [savedTotal, setSavedTotal] = useState<string>('');
  const [input, setInput] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [accountGoal, setAccountGoal] = useState<string>('');

  const onSubmit = async () => {
    let total = detail.saved + parseFloat(savedTotal);

    if (total <= detail.total) {
      const add = { save: total };
      await axios.put(`${base_URL}/goal/${detail.id}`, add);
    } else {
      Alert.alert('Savings amount exceeds total');
    }

    const expenseSave = {
      category: 'Goal',
      description: detail.name,
      amount: parseFloat(savedTotal),
      paymentMethod: accountGoal,
    };

    dispatch(postExpense(ide[ide.length - 1], expenseSave));
    dispatch(getDetail(idGoal));
    setSavedTotal('');
    charge();
  };

  const charge = () => {
    dispatch(getAccounts(ide[ide.length - 1]));
    dispatch(getMovements(ide[ide.length - 1]));
    dispatch(getIncome(ide[ide.length - 1]));
    dispatch(getExpense(ide[ide.length - 1]));
  };

  useEffect(() => {
    dispatch(getDetail(idGoal));
    dispatch(getAccounts(ide[ide.length - 1]));
  }, [detail.saved]);

  const data: AccountData[] = [];

  accounts.forEach((a: string) => {
    data.push({
      label: a,
      value: a,
    });
  });

  const handleAchieved = async () => {
    await axios.put(`${base_URL}/goal/delete/${detail.id}`);
    dispatch(getAllGoals(ide[ide.length - 1]));
    navigation.navigate('GoalsList');
  };

  let total = detail.saved + parseFloat(savedTotal);

  return (
    <View style={styles.container}>
      <View style={styles.allItems}>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          {detail?.picture && (
            <Image source={{ uri: detail.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>{detail?.name}</Text>
          <Text style={styles.text}>{detail?.description}</Text>
          <Text style={styles.text}>Total: {detail?.total}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Saved: {detail?.saved}</Text>
            <TouchableOpacity onPress={() => setInput(!input)}>
              <Text style={{ fontSize: 25, color: 'yellow' }}> |+</Text>
            </TouchableOpacity>
          </View>
          {input && (
            <View
              style={{
                display: 'flex',
                backgroundColor: Colors.DETAIL_COLOR,
                height: 170,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                borderRadius: 15,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                }}>
                <TextInput
                  onChangeText={value => setSavedTotal(value)}
                  keyboardType="numeric"
                  value={savedTotal.toString()}
                  style={styles.input}
                  placeholder="Amount"></TextInput>

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
                  onChange={value => setAccountGoal(value.value)}
                />
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    marginBottom: 60,
                    backgroundColor: Colors.BACKGROUND_COLOR,
                    padding: 5,
                    borderRadius: 15,
                    width: 75,
                  }}
                  onPress={() => {
                    onSubmit(), setInput(false), dispatch(getDetail(idGoal));
                  }}
                  disabled={total >= detail.total || !accountGoal}>
                  <Text style={{ left: 16 }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.achievedBtn}
              onPress={handleAchieved}>
              <Text style={{ left: 35, fontSize: 20 }}>Achieved Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalDetail;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  allItems: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    allignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    padding: 15,
  },
  input: {
    backgroundColor: Colors.DETAIL_COLOR,
    marginBottom: 20,
    borderRadius: 50,
    width: 100,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
    top: 40,
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
  achievedBtn: {
    bottom: -80,
    width: 220,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
  },
});

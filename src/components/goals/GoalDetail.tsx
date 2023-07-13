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
        <View style={{flexDirection: 'row', paddingBottom:15, paddingVertical:10, marginTop: 50}}>
      
          <TouchableOpacity onPress={() => navigation.navigate('GoalsList')}>
            <Text  style={styles.goBack}>{'<'}</Text>
          </TouchableOpacity>
      
          <View style={{flexDirection: 'row', width: "80%", alignSelf:"center"}}>
            <Text style={{
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold',
                left: -15,
                marginStart:70
              }}>
              Goal:<Text style={{ color: 'yellow' }}> {detail?.name}</Text>
            </Text>
          </View>
        </View>

        <View style={{alignItems: "center", marginTop: 10, marginHorizontal: 10}}>
          <View style={styles.imageContainer}>
            {detail?.picture && (
            <Image source={{ uri: detail.picture }} style={styles.image} />
            )}
          </View>


          <View style={{flexDirection: 'row', width: "100%", marginTop: 10, padding: 5, margin: 5}}>
                  <View style={{ width: "60%",backgroundColor:'#A16AE2', borderRadius: 15, marginHorizontal: 5, paddingVertical:8}}>

                        <Text style={styles.text}>{detail?.description}</Text>

                  </View>

                  <View style={{ width: "35%",backgroundColor:'#A16AE2', borderRadius: 15, justifyContent: "center", paddingEnd: 5}}>

                          <Text style={{alignSelf: "flex-end",fontSize: 30, fontWeight: "bold", color: "yellow" }}>${detail?.total}</Text>

                  </View>
          </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10 }}>
              <Text style={{color: '#A16AE2', fontWeight: 'bold', fontSize: 25}}>Saved  ${detail?.saved}</Text>
              <TouchableOpacity onPress={() => setInput(!input)} style={{
                  borderColor: "white", 
                  borderWidth: 1.5,
                  borderBottomEndRadius: 8,
                  borderTopEndRadius: 8,
                  width:30,
                  marginStart:10,
                  paddingHorizontal: 4
                  }}>
                <Text style={{ 
                  fontSize: 30, 
                  color: 'white' , 
                  }}>+</Text>
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
                marginBottom: 0
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
                  placeholder="Amount..."></TextInput>

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
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 15,
                    width: 75,
                    borderWidth: 2,
                    borderColor: '#A16AE2',
                  }}
                  onPress={() => {
                    onSubmit(), setInput(false), dispatch(getDetail(idGoal));
                  }}
                  disabled={total >= detail.total || !accountGoal}>
                  <Text style={{ left: 16, fontWeight: 'bold', marginVertical: 0}}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ 
            alignItems: 'center', 
            justifyContent: 'flex-end' ,
            flex: 1,
            margin: 100
          }}>
            <TouchableOpacity
              style={styles.achievedBtn}
              onPress={handleAchieved}>
              <Text  style={ { left: 35, fontSize: 20, fontWeight: 'bold' } }  >Achieved Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoalDetail;

const styles = StyleSheet.create({
  imageContainer:{ 
    backgroundColor:'#A16AE2', 
    padding: 10, 
    width: "95%", 
    borderWidth: 4, 
    borderColor: '#3D2766',
    borderRadius: 15
  },
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
    width: 200,
    height: 150,
    borderRadius: 15,
    alignSelf: "center"
  },
  text: {
    color: Colors.BACKGROUND_COLOR,
    fontSize: 25,
    padding: 15,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: Colors.DETAIL_COLOR,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth:2,
    borderColor: 'white',
    width: 200,
    height: 40,
    fontSize: 18,
    fontWeight: 'bold',
    top: 40,
    marginTop:25,
    alignItems: 'center'
  },
  dropdown: {
    margin: 16,
    height: 40,
    width: 200,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    padding: 15,
    marginTop: 30
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
    bottom: 8,
    width: 220,
    borderWidth: 2,
    borderColor: '#513273',
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: 'yellow',
    color: '#513273',
    position: 'absolute',
    justifyContent: 'flex-end'
  },
  goBack: {
    alignSelf: "flex-start",
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
    marginHorizontal:10,
  },
});

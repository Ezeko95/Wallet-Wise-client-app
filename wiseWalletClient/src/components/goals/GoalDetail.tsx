import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { base_URL } from '../../redux/utils';
import axios from 'axios';
import { IGoal } from './GoalsList';
import { getDetail } from '../../redux/slices/goalSlice';
import { postExpense } from '../../redux/slices/expenseSlice';
interface Props {
  id: number;
}

interface IDetail {
  name: string;
}

const GoalDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const idGoal = useAppSelector(state => state.goal.goalId);
  const detail = useAppSelector(state => state.goal.detail);

  const [savedTotal, setSavedTotal] = useState<string>('');
  const [input, setInput] = useState<boolean>(false);

  const onSubmit = async () => {
    let total = detail.saved + parseFloat(savedTotal);
    const add = { save: total };
    await axios.put(`${base_URL}/goal/${detail.id}`, add);

    // const expenseSave={
    //     category: 'Goal',
    //     description: detail.name,
    //     amount: parseFloat(savedTotal),
    //     paymentMethod: 'brubank'
    // }
    //dispatch(postExpense(ide[0], expenseSave))
    dispatch(getDetail(idGoal));
    setSavedTotal('');
  };

  useEffect(() => {
    dispatch(getDetail(idGoal));
  }, [detail.saved]);

  console.log(savedTotal, 'SAVE TOTAL STATE');
  console.log(detail);

  return (
    <View style={styles.container}>
      {detail?.picture && (
        <Image source={{ uri: detail.picture }} style={styles.image} />
      )}
      <Text style={styles.text}>{detail?.name}</Text>
      <Text style={styles.text}>{detail?.description}</Text>
      <Text style={styles.text}>Total: {detail?.total}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>Saved: {detail?.saved}</Text>
        <TouchableOpacity onPress={() => setInput(true)}>
          <Text style={{ fontSize: 25, color: 'black' }}> |+</Text>
        </TouchableOpacity>
        {input && (
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              onChangeText={value => setSavedTotal(value)}
              keyboardType="numeric"
              value={savedTotal.toString()}
              style={styles.input}
              placeholder="Ingrese su monto"></TextInput>
            <TouchableOpacity
              onPress={() => {
                onSubmit(), setInput(false), dispatch(getDetail(idGoal));
              }}>
              <Text style={{ color: 'black' }}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity>
        <Text>Achieved Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalDetail;

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: 500,
    margin: 20,
    borderColor: 'blue',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
  },
  input: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    width: 205,
    height: 55,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    top: 50,
  },
});

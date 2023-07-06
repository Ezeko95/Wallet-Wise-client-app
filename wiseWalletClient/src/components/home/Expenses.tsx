import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ImageBackground } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { getIncome, cleanItemId, setItemId, getMovements, getExpense } from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { IExpenses } from '../../redux/interfaces/Interface';
import Loader from '../Loader/Loader';

interface IUpdateStateInc {
  category: string;
  amount: number;
}

interface Props {}

const Incomes: React.FC<Props> = () => {

  const [showLoader, setShowLoader] = useState(false);

  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const incomes = useAppSelector((state) => state.allMovements.incomes);
  const idUser = useAppSelector((state) => state.user.user);
  const ide = idUser.map((idUser) => idUser.payload.user.id);
  const filter = useAppSelector((state) => state.allMovements.filtered);
  const balance = useAppSelector((state) => state.allMovements.balance);
  const itemId = useAppSelector((state) => state.allMovements.itemId);
  const [amount, setAmount] = useState('');

  const show: IExpenses[] = useAppSelector((state) => state.allMovements.expenses).filter((expense) => !expense.deletedExpense);

  const navigateToDetail = (selectedExpense: IExpenses) => {
    navigation.navigate('DetailExpense', { income: selectedExpense });
  };

  const handleShowExpense = async (idinc: number, ide: number) => {
    const response = await axios.put(`${base_URL}/movement/expense/${idinc}`);
    dispatch(getExpense(ide));
  };

  const handleUpdateExpense = async () => {
    const infoEdit: IUpdateStateInc = {
      category: '',
      amount: parseFloat(amount),
    };

    itemId && (await axios.put(`${base_URL}/movement/newExpense/${itemId}`, infoEdit));
    dispatch(getExpense(ide[ide.length-1]));
  };

  const colors = [
    '#5EFC8D',
    '#8EF9F3',
    '#53599A',
    '#ECD444',
    '#FFFFFF',
    '#C42021',
    '#F44708',
    '#CA61C3',
    '#FF958C',
    '#ADFCF9',
  ];

  useEffect(() => {
    dispatch(getMovements(ide[ide.length-1]));
    dispatch(getAccounts(ide[ide.length-1]));
    dispatch(getExpense(ide[ide.length-1]));
  }, []);

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000); // Duración de 3 segundos
    }
  }, [showLoader]);

  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Expenses</Text>

          <View>
            <Text style={styles.text}>${show.reduce((acc, expense) => acc + expense.amount, 0)}</Text>
            <VictoryPie
              style={{
                labels: {
                  fill: '#FFFFFF',
                },
              }}
              innerRadius={110}
              colorScale={colors}
              data={show.map((expense) => ({ x: expense.id, y: expense.amount }))}
            />
          </View>

          <FlatList
            data={show}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowLoader(true);
                      navigateToDetail(item);
                      dispatch(setItemId(item.id));
                      dispatch(getIncome(ide[ide.length-1]));
                    }}
                  >
                    <View style={styles.detail}>
                      <Text style={{ fontSize: 20, color: 'white', top: 5, marginLeft: 10 }}>
                      {item.id} -  {item.category}: {item.amount}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
      {showLoader && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
    height: '100%',
  },

  title: {
    color: 'white',
    fontSize: 30,
  },

  chart: {
    marginTop: 40,
    height: 220,
    width: 220,
  },

  text: {
    top: 270,
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },

  detail: {
    width: 250,
    backgroundColor: Colors.DETAIL_COLOR,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 100,
    padding: 8,
  },

  inputs: {
    backgroundColor: 'white',
    marginTop: 30,
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: 'center',
  },
});

export default Incomes;

function useAPPDispatch() {
  throw new Error('Function not implemented.');
}
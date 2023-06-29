import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ImageBackground } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { getIncome, cleanItemId, setItemId, getMovements } from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { IIncome } from '../../redux/interfaces/Interface';

interface IUpdateStateInc {
  type: string;
  amount: number;
}

interface Props {}

const Incomes: React.FC<Props> = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const incomes = useAppSelector((state) => state.allMovements.incomes);
  const idUser = useAppSelector((state) => state.user.user);
  const ide = idUser.map((idUser) => idUser.payload.user.id);
  const filter = useAppSelector((state) => state.allMovements.filtered);
  const balance = useAppSelector((state) => state.allMovements.balance);
  
  const itemId = useAppSelector((state) => state.allMovements.itemId);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const show: IIncome[] = useAppSelector((state) => state.allMovements.incomes).filter((income) => !income.deletedIncome);

  const navigateToDetail = (selectedIncome: IIncome) => {
    navigation.navigate('DetailIncome', { income: selectedIncome });
  };

  const handleShowIncome = async (idinc: number, ide: number) => {
    const response = await axios.put(`${base_URL}/movement/income/${idinc}`);
    dispatch(getIncome(ide));
  };

  const handleUpdateIncome = async () => {
    const infoEdit: IUpdateStateInc = {
      type,
      amount: parseFloat(amount),
    };

    itemId && (await axios.put(`${base_URL}/movement/newIncome/${itemId}`, infoEdit));
    dispatch(getIncome(ide[ide.length-1]));
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
    dispatch(getIncome(ide[ide.length-1]));
  }, []);

  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Incomes</Text>

          <View>
            <Text style={styles.text}>${show.reduce((acc, income) => acc + income.amount, 0)}</Text>
            <VictoryPie
              style={{
                labels: {
                  fill: '#FFFFFF',
                },
              }}
              innerRadius={110}
              colorScale={colors}
              data={show.map((income) => ({ x: income.type, y: income.amount }))}
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
                      navigateToDetail(item);
                      dispatch(setItemId(item.id));
                      dispatch(getIncome(ide[ide.length-1]));
                    }}
                  >
                    <View style={styles.detail}>
                      <Text style={{ fontSize: 20, color: 'white', top: 5, marginLeft: 10 }}>
                        {item.type}: {item.amount}
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
    top: 230,
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
import React, { useEffect } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getExpense } from '../../redux/slices/allMovementsSlice';

interface Props {}

const Expenses: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const expenses = useAppSelector(state => state.allMovements.expenses)

  const incexp: any[] = [...expenses]

  useEffect(() => {
    dispatch(getExpense(1))
  }, [])

  
  return (
    <View>
       <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Expenses</Text>
          <View>
            <VictoryPie
              theme={VictoryTheme.material}
              data={incexp.map(e=>{
                if (e.category) return {x: e.category, y: e.amount}
              })}
            />
          </View>
          <FlatList
            data={incexp}
            renderItem={({item}) =>{
              if(item.category){
                return <Text style={styles.detail}>{item.category}:  {item.amount}</Text>
              } else {
                return <Text style={styles.detail}>No hay Gastos</Text>
              }
            }}
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
      color: Colors.TITLE_COLOR,
      fontSize: 30,
    },
  
    chart: {
      marginTop: 40,
      height: 220,
      width: 220,
    },
  
    detail: {
      width: 250,
      borderColor: 'black',
      backgroundColor: Colors.DETAIL_COLOR,
      margin: 10,
      borderRadius: 5,
      color: '#fff',
      fontSize: 20,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

export default Expenses;
import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useEffect } from 'react'
import { getIncome } from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {}

const Incomes: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const incomes = useAppSelector(state=> state.allMovements.incomes)

  const incexp: any[] = [...incomes]
  
  useEffect(() => {
    console.log(dispatch(getIncome(1)))
  }, [])

  // const handleDeleteIncome= (id: number)=>{
  //   const response= await axios.delete(`${base_URL}/movement/income/${id}`)
  // }

  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Incomes</Text>
          <View>
            <VictoryPie
              theme={VictoryTheme.material}
              data={incexp.map(e=>{
                if (e.type) return {x: e.type, y: e.amount}
              })}
            />
          </View>
          <FlatList
          nestedScrollEnabled
            data={incexp}
            renderItem={({item}) =>{
              if(item.type){
                return <Text style={styles.detail}>{item.type}:  {item.amount}</Text> 
              } else {
                return <Text style={styles.detail}>No hay Ingresos</Text>
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
    color: 'white',
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

export default Incomes;
function useAPPDispatch() {
  throw new Error('Function not implemented.');
}
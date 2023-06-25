import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useEffect } from 'react'
import { getIncome } from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';


interface Props {}

const Incomes: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const incomes = useAppSelector(state=> state.allMovements.incomes)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)


  const mapIncome = incomes.map(amount => amount.amount)
  const reduceIncome = mapIncome.reduce((a, b) => a + b, 0)

  console.log('====================================');
  console.log(reduceIncome);
  console.log('====================================');

  //const incexp: any[] = [...incomes]
  
  useEffect(() => {
    console.log(dispatch(getIncome(ide[0])))
  }, [])

  const show: any[] = filter; 

  // const handleDeleteIncome= (id: number)=>{
  //   const response= await axios.delete(`${base_URL}/movement/income/${id}`)
  // }
  const handleDeleteIncome= async (idinc: number, ide: number)=>{
    const response= await axios.delete(`${base_URL}/movement/income/${idinc}`)
    .then(()=>{  
      dispatch(getIncome(ide))
      console.log('dispach');
      
     }
     )
  }
     //esto agregarrrr const filterExpenses= expenses.filter((expense)=> expense.deletedExpense)
     //dispatch(getExpense(ide))

  const handleShowIncome= async(idinc: number, ide: number)=>{
    const response= await axios.put(`${base_URL}/movement/income/${idinc}`)
    .then(()=>{  
     dispatch(getIncome(ide))
    })
  }

  const incomesFilterDel = incomes.filter((income)=> !income.deletedIncome)

  const colors = [
    "#5EFC8D",
    "#8EF9F3",
    "#53599A",
    "#ECD444",
    "#FFFFFF",
    "#C42021",
    "#F44708",
    "#CA61C3",
    "#FF958C",
    "#ADFCF9"
  ]
   
  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Incomes</Text>
          
          <View>
                      <Text style={styles.text}>${reduceIncome}</Text>
                      <VictoryPie
                      
                            style={{
                              labels: {
                                fill: '#FFFFFF'
                              }
                            }}
                            innerRadius={110}
                            colorScale={colors}
                            data={show?.map(e=>{
                              if (e.type){
                              return {x: e.type, y: e.amount}
                              } else {
                                return {x: e.category, y: e.amount}
                              }
                            })}
                          />
                    </View>
          <FlatList
          nestedScrollEnabled
            data={incomes}
            renderItem={({item}) =>{
              if(item.type){
                //return <View></View>
               return  <View> 
                          <Text style={styles.detail}>{item.type}:  {item.amount}  </Text>
                              {
                                !item.deletedIncome ?
                          <TouchableOpacity onPress={() => handleDeleteIncome(item.id, ide[0])}>
                                <Text style={{color: 'white'}}>X</Text>
                          </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => handleShowIncome(item.id, ide[0])}>
                                    <Text style={{color: 'white'}}>Show</Text>
                                </TouchableOpacity>
                              }
                          
                      </View>

                      
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

  text:{
    top: 230,
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
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
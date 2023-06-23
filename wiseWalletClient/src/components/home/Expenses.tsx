import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getExpense } from '../../redux/slices/allMovementsSlice';
import { ExpenseData } from '../../redux/slices/expenseSlice';
import { IExpenses } from '../../redux/interfaces/Interface';
import axios from 'axios';
import { base_URL } from '../../redux/utils';

// interface Expense {
//   amount : number,
//   description: string,
//   category: string,
//   paymentMethod: string,
//   id: number,
//   deletedExpense: boolean
// }

interface Props {}

const Expenses: React.FC<Props> = () => {

  const dispatch = useAppDispatch()



  const expenses = useAppSelector(state => state.allMovements.expenses)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)

  

  //const [localExpense, setExpense] = useState<IExpenses[]>([]) //estado local
  //console.log(localExpense, 'ACAAAAAA ESSSSS ESTADO LOCAL');
  //console.log(expenses, 'EXPENSES DEL REDUX');
  
  //const incexp: any[] = [...expenses]

  

  useEffect(() => {
    dispatch(getExpense(ide[0]))
    
  }, [])

   const handleDeleteExpense= async (idexp: number, ide: number)=>{
     const response= await axios.delete(`${base_URL}/movement/expense/${idexp}`)
     .then(()=>{  
       dispatch(getExpense(ide))
       console.log('dispach');
       
      }
      )
      }
      //esto agregarrrr const filterExpenses= expenses.filter((expense)=> expense.deletedExpense)
      //dispatch(getExpense(ide))

   const handleShowExpense= async(idexp: number, ide: number)=>{
     const response= await axios.put(`${base_URL}/movement/expense/${idexp}`)
     .then(()=>{  
      dispatch(getExpense(ide))
     })
     
      
     
  //   dispatch(getExpense(id))
   }

   const handleUpdateExpense= async (ide: number)=>{
     const response= await axios.put(`${base_URL}/movement/newExpense/${ide}`)
  //   dispatch(getExpense(id))
   }

   const expenseFilterDel= expenses.filter((expense)=> !expense.deletedExpense)
   console.log(expenses, 'estado local esasasasasasa');
   
  
  return (
    <View>
       <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Expenses</Text>
          <View>
            <VictoryPie
              theme={VictoryTheme.material}
              data={expenseFilterDel.map(e=>{
                if (e.category) return {x: e.category, y: e.amount}
              })}
            />
          </View>
          <FlatList
            data={expenses}
            nestedScrollEnabled
            renderItem={({item}) =>{
              if(item.category){
                return <View> 
                          <Text style={styles.detail}>{item.category}:  {item.amount}  </Text>
                              {
                                !item.deletedExpense ?
                          <TouchableOpacity onPress={() => handleDeleteExpense(item.id, ide[0])}>
                                <Text style={{color: 'white'}}>X</Text>
                          </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => handleShowExpense(item.id, ide[0])}>
                                    <Text style={{color: 'white'}}>Show</Text>
                                </TouchableOpacity>
                              }
                          
                      </View>
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
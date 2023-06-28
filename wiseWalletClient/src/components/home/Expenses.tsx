
import React, { useState, useEffect }from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ImageBackground } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { cleanItemId, setItemId, getMovements, getExpense} from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { IExpenses } from '../../redux/interfaces/Interface';

interface IUpdateStateInc {
  type: string,
  amount: number
}

interface Props {}

const Expenses: React.FC<Props> = () => {
  const navigation:(any) = useNavigation();

  const dispatch = useAppDispatch()
  const expenses = useAppSelector(state=> state.allMovements.expenses)

  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)
  const selector = useAppSelector((state) => state.user.user)
  const aidi = selector.map(selector => selector.payload.user.id)
  const itemId= useAppSelector((state)=> state.allMovements.itemId)
  const show: any[] = filter; 
  const [type, setType]= useState('')
  const [amount, setAmount] = useState('')
  const expenseFilterDel = expenses.filter((expense)=> !expense.deletedExpense)
  const mapExpense = expenseFilterDel.map(amount => amount.amount)
  const reduceExpense = mapExpense.reduce((a, b) => a + b, 0)

  //const incexp: any[] = [...incomes]

  const navigateToDetail = (selectedExpense: IExpenses) => {
    navigation.navigate('DetailExpense', { income: selectedExpense });
  };


  // const handleDeleteIncome= (id: number)=>{
    //   const response= await axios.delete(`${base_URL}/movement/income/${id}`)
    // }
    const handleDeleteIncome= async (idinc: number, ide: number)=>{
      const response= await axios.delete(`${base_URL}/movement/expense/${idinc}`)
      .then(()=>{  
        dispatch(getExpense(ide))
        dispatch(getAccounts(ide))  
      }
      )
    }
    //esto agregarrrr const filterExpenses= expenses.filter((expense)=> expense.deletedExpense)
    //dispatch(getExpense(ide))
    const handleShowIncome= async(idinc: number, ide: number)=>{
      const response= await axios.put(`${base_URL}/movement/expense/${idinc}`)
      .then(()=>{  
        dispatch(getExpense(ide))
      }
      )
    }
    

    const handleUpdateIncome= async ()=>{
      const infoEdit: IUpdateStateInc = {
        type,
        amount: parseFloat(amount)
      }

      console.log(infoEdit,'QUE INFO LE MANDAMOS AL BAAAACCCCKKKK');
      itemId && console.log(itemId,'QUE ID LE MANDAMOS AL BAAAACCCCKKKK');
      itemId && console.log(`${base_URL}/movement/newExpense/${itemId}`);
      itemId &&  await axios.put(`${base_URL}/movement/newExpense/${itemId}`, infoEdit)
      //  .then(response=> console.log(response, 'ESTO ES EL RESPONSE'))
      //   // .then(data=> {
      //   //   if(data.description){
      //   //     console.log(data, 'DAAAAATTTTT');

      //   //     const filter= data.expense.filter((e: any)=> e.id === idExp)
      //   //     console.log(filter,'TODOOOOOOOOS LOSSSS EXPENSES');
      //   //   }else{
      //   //     console.log('fail')
      //   //   }
      //   // })
      .then(()=>{
        console.log("este es el dispatch", dispatch(getExpense(ide[0])))
        dispatch(getExpense(ide[0]))
    })
  }
  
  const colors = ["#5EFC8D","#8EF9F3","#53599A","#ECD444","#FFFFFF","#C42021","#F44708","#CA61C3","#FF958C","#ADFCF9"]

  const transparent = 'rgba(0,0,0,0.5)'
  
  useEffect(() => {
    dispatch(getExpense(ide[0]))
    dispatch(getAccounts(ide[0]))
  }, [])

  return (
      <View>
        <ScrollView bounces={true}>
          <StatusBar barStyle="light-content" />
          <View style={styles.homeCard}>
            <Text style={styles.title}>Expenses</Text>
            <View>
            <Text style={styles.text}>${reduceExpense}</Text>
              <VictoryPie
                style={{
                  labels: {
                    fill: '#FFFFFF'
                  }
                }}
                innerRadius={110}
                colorScale={colors}
                data={expenseFilterDel?.map(e => {
                  if (e.category) {
                    return { x: e.category, y: e.amount }
                  }
                })}
              />
            </View>

            <FlatList
              data={expenses}
              nestedScrollEnabled
              renderItem={({ item }) => (
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigateToDetail(item)}>
                      <View style={styles.detail}>
                        <Text style={{ fontSize: 20, color: 'white', top: 5, marginLeft: 10 }}>{item.category}: {item.amount}</Text>
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
  }



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
    backgroundColor: Colors.DETAIL_COLOR,
    flexDirection: 'row',
    margin: 10,
    borderRadius: 100,
    padding: 8,
  },
  inputs:{
    backgroundColor: 'white',
    marginTop:30,
    borderRadius: 10,
    width: 200,
    height: 40,
    alignSelf: 'center',

  },
});

export default Expenses;
function useAPPDispatch() {
  throw new Error('Function not implemented.');
}
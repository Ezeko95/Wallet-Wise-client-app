import React, { isValidElement, useEffect, useState } from 'react';
import { ImageBackground ,ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Modal } from 'react-native';
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from 'victory-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { Colors } from '../../enums/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAccounts, getExpense, setItemId, cleanItemId, getMovements } from '../../redux/slices/allMovementsSlice';
import { ExpenseData } from '../../redux/slices/expenseSlice';
import { IExpenses } from '../../redux/interfaces/Interface';
import axios from 'axios';
import { base_URL } from '../../redux/utils';

interface IUpdateState {
  description: string,
  amount: number
}

interface Props {}

const Expenses: React.FC<Props> = () =>  {

  const dispatch = useAppDispatch()
  const expenses = useAppSelector(state => state.allMovements.expenses)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)
  const itemId= useAppSelector((state)=> state.allMovements.itemId)
  
  const show: any[] = filter; 
  const [description, setDescription]= useState('')
  const [amount, setAmount] = useState('')
  const [openModal, setOpenModal] = useState(false)
  
  const expenseFilterDel = expenses.filter((expense)=> !expense.deletedExpense)
  const mapExpense = expenseFilterDel.map(amount => amount.amount)
  const reduceExpense = mapExpense.reduce((a, b) => a + b, 0)

//    // Realizar la actualización del gasto
//    await axios.put(`${base_URL}/movement/newExpense/${expenseId}`, infoEdit);
//    // Actualizar los gastos en el estado
//    dispatch(getExpense(ide[0]));
//  }
//};

  const handleDeleteExpense= async (idexp: number, ide: number)=>{
    console.log(idexp,'este es el del deleteeeeed');
    
    const response= await axios.delete(`${base_URL}/movement/expense/${idexp}`)
      .then(()=>{  
        dispatch(getExpense(ide))
        dispatch(getAccounts(ide))
      }
    )
  }
      
  const handleShowExpense= async(idexp: number, ide: number)=>{
    const response= await axios.put(`${base_URL}/movement/expense/${idexp}`)
      .then(()=>{  
      dispatch(getExpense(ide))
    })
  }
    
  const handleUpdateExpense= async ()=>{
    const infoEdit: IUpdateState = {
      description,
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

  const transparent = 'rgba(0,0,0,0.5)'
   
  const colors = ["#5EFC8D","#8EF9F3","#53599A","#ECD444","#FFFFFF","#C42021","#F44708","#CA61C3","#FF958C","#ADFCF9"]

  useEffect(() => {
    dispatch(getAccounts(ide[0]))
    dispatch(getMovements(ide[0]))
    dispatch(getExpense(ide[0]))
  }, [])

    
  const charGraficos = useAppSelector(state=> state.onBoarding.Onboarding)
  const change = charGraficos.change.map(item=> item.name)
  const chart = charGraficos.grafico.map(item => item.name) 

  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
          <View style={styles.homeCard}>
            <Text style={styles.title}>Expenses</Text>
            
            <View>
              
                <Text style={styles.text}>{change}{reduceExpense}</Text>
                <VictoryPie
              
                      style={{
                        labels: {
                          fill: '#FFFFFF'
                        }
                      }}
                      innerRadius={110}
                      colorScale={colors}
                      data={expenseFilterDel?.map(e=>{
                        // if (e.type){
                        // return {x: e.type, y: e.amount}
                        // } else {
                          return {x: e.category, y: e.amount}
                        //}
                      }
                      )}
                    />               
                     
                    </View>
            <FlatList
              data={expenses}
              nestedScrollEnabled
              renderItem={({item, index}) =>{
              if(item.category){
                return <View> 
                          
                              <View style={{flexDirection:'row'}}>
                                <Text style={styles.detail}> {item.category}:  {item.amount}  </Text>
                                {
                                  !item.deletedExpense ?
                                    <TouchableOpacity  style={{backgroundColor: '#6071EB', borderRadius: 20, margin: 10, padding: 5}} onPress={() => handleDeleteExpense(item.id, ide[0])}>
                                          <Image style={{width: 30, height: 30}} source={require('./show.png')}/>
                                    </TouchableOpacity>
                                  :
                                    <TouchableOpacity style={{backgroundColor: '#6071EB', borderRadius: 20, margin: 10, padding: 5}} onPress={() => handleShowExpense(item.id, ide[0])}>
                                        <Image style={{width: 30, height: 30}} source={require('./hide.png')}/>
                                    </TouchableOpacity>
                                }
                                  <TouchableOpacity 
                                    key={item.id}
                                    onPress={() => { setOpenModal(true), dispatch(setItemId(item.id))}}
                                
                                    >


                                    {openModal &&
                                      <View>
                                        <Modal visible={openModal} animationType='slide' transparent={true}>
                                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent}}>
                                            <View style={{backgroundColor: '#1E2349', padding: 15, width: 300, height: 400, borderRadius:10}}>
                                            <ImageBackground style={{flex: 1}} source={require('./fondoModal.png')}>
                                              <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() =>{ setOpenModal(false), dispatch(cleanItemId())}}>
                                                  <Image style={{width: 40, height: 40, alignItems: 'center'}} source={require('./x.png')}/>
                                              </TouchableOpacity>

                                              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Update your Expense</Text>
                                              <View>
                                                <TextInput style={styles.inputs} placeholder='Description' value={description} onChangeText={(value)=> setDescription(value)}/>
                                                <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount}  onChangeText={(value)=> setAmount(value)}/>
                                                <TouchableOpacity onPress={() =>  {handleUpdateExpense()}} style={{backgroundColor: '#6071EB', padding: 10, borderRadius: 10, marginTop: 30, width: 80, alignSelf: 'center'}}>
                                                  <Text style={{ fontSize: 14, textAlign:'center'}}>Update</Text>
                                                </TouchableOpacity>
                                              
                                              </View>
                                              </ImageBackground>
                                            </View>
                                          </View>
                                        </Modal>
                                      </View>
                                    }
                                    <View style={{backgroundColor: 'orange', padding: 8, borderRadius: 20, top: 8}}>
                                    <Image style={{ width: 28, height: 28}} source={require('./pencil.png')}/>
                                    </View>
                                  </TouchableOpacity>
                              
                                  </View>
                          
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
    selectedTextStyle:{
      color: Colors.TITLE_COLOR,
    },
    placeholderStyle:{
      color: Colors.TITLE_COLOR,
    },
    dropdown: {
      margin: 16,
      height: 40,
      width: 200,
      backgroundColor: '#EEEEEE',
      borderRadius: 22,
      paddingHorizontal: 8,
    },
    imageStyle: {
      width: 25,
      height: 25,
      borderRadius: 12,
    },
    // selectedTextStyle: {
    //   fontSize: 14,
    //   marginLeft: 8,
    // },
    iconStyle: {
      width: 20,
      height: 20,
    },

  });


export default Expenses;
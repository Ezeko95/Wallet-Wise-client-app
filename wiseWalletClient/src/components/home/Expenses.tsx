import React, { isValidElement, useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Button, Modal } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { Colors } from '../../enums/Colors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getExpense } from '../../redux/slices/allMovementsSlice';
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

  const [description, setDescription]= useState('')

  const [amount, setAmount] = useState('')

  const show: any[] = filter; 

  const mapExpense = expenses.map(amount => amount.amount)
  const reduceExpense = mapExpense.reduce((a, b) => a + b, 0)


  useEffect(() => {
    dispatch(getExpense(ide[0]))  
  }, [])

  const handleDeleteExpense= async (idexp: number, ide: number)=>{
    console.log(idexp,'este es el del deleteeeeed');
    
    const response= await axios.delete(`${base_URL}/movement/expense/${idexp}`)
      .then(()=>{  
        dispatch(getExpense(ide))
      }
    )
  }
      
  const handleShowExpense= async(idexp: number, ide: number)=>{
    const response= await axios.put(`${base_URL}/movement/expense/${idexp}`)
      .then(()=>{  
      dispatch(getExpense(ide))
    })
  }
    
  // const handleUpdateExpense= async (idExp: number)=>{
  //   const infoEdit: IUpdateState = {
  //     description,
  //     amount: parseFloat(amount)
  //   }
  //   console.log(infoEdit,'QUE INFO LE MANDAMOS AL BAAAACCCCKKKK');
  //   console.log(idExp,'QUE ID LE MANDAMOS AL BAAAACCCCKKKK');
  //   console.log(`${base_URL}/movement/newExpense/${idExp}`);
    
  //   const response= await axios.put(`${base_URL}/movement/newExpense/${idExp}`, infoEdit)
  //   .then(response=> console.log(response, 'ESTO ES EL RESPONSE'))
  //   // .then(data=> {
  //   //   if(data.description){
  //   //     console.log(data, 'DAAAAATTTTT');
        
  //   //     const filter= data.expense.filter((e: any)=> e.id === idExp)
  //   //     console.log(filter,'TODOOOOOOOOS LOSSSS EXPENSES');
  //   //   }else{
  //   //     console.log('fail')
  //   //   }
  //   // })
  //   .then(()=>{
  //     console.log("este es el dispatch", dispatch(getExpense(ide[0])))
  //     dispatch(getExpense(ide[0]))
  //   })
  // }

  const expenseFilterDel= expenses.filter((expense)=> !expense.deletedExpense)
  
  const transparent = 'rgba(0,0,0,0.5)'
  
  const [openModal, setOpenModal] = useState(false)

  //const renderModal = (idExp: number) => {}

    interface dataExpense {
      value: string;
      label: string;
      image: {
        uri: string;
      };
    }

    const data: dataExpense[] = [
      {
        value: 'mercadopago',
        label: 'Mercado Pago',
        image: {
          uri: 'https://www.bsr.cl/wp-content/uploads/2018/12/Mercadopago.jpg',
        },
      },
      {
        value: 'brubank',
        label: 'Brubank',
        image: {
          uri: 'https://th.bing.com/th/id/OIP.JKHQkVt2TiFcTDh4DNNI_AAAAA?pid=ImgDet&rs=1',
        },
      },
      {
        value: 'cash',
        label: 'Cash',
        image: {
          uri: 'https://th.bing.com/th/id/R.46885d1334b48f81acf9a4e6b5fea757?rik=WUZNoNBF8HztrA&riu=http%3a%2f%2ffishaowiki.com%2fwp-content%2fuploads%2f2013%2f10%2ffishbucks.gif&ehk=jFVu8FmI9rISaCTEcIg7Oc6Cy2lIOwU%2bruIc%2bDIn3fc%3d&risl=&pid=ImgRaw&r=0',
        },
      },
      {
        value: 'uala',
        label: 'Uala',
        image: {
          uri: 'https://th.bing.com/th/id/OIP.raKhtV2oJ1WEJg8wFUFTJAHaHa?pid=ImgDet&rs=1',
        },
      },
      {
        value: 'santander',
        label: 'Santander Rio',
        image: {
          uri: 'https://yt3.ggpht.com/-ucfOhKHcl_w/AAAAAAAAAAI/AAAAAAAAAAA/mzypJuHb_go/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
        },
      },
    ]
  
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
              data={expenses}
              nestedScrollEnabled
              renderItem={({item, index}) =>{
              if(item.category){
                return <View> 
                          {/* <TouchableOpacity >
                            <Image source={require('./pencil.png')}></Image>
                          </TouchableOpacity> */}
                              <View style={{flexDirection:'row'}}>
                                <Text style={styles.detail}> {item.category}:  {item.amount}  </Text>
                                  <TouchableOpacity 
                                    key={item.id}
                                    onPress={() => { setOpenModal(true)}}
                                
                                    >


                                    {/* {openModal &&
                                      <View>
                                        <Modal visible={openModal} animationType='slide' transparent={true}>
                                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent}}>
                                            <View style={{backgroundColor: '#171738', padding: 15, width: '90%', height: 400, borderRadius:10}}>
                                              <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => setOpenModal(false)}>
                                                  <Image style={{width: 40, height: 40, alignItems: 'center'}} source={require('./x.png')}/>
                                              </TouchableOpacity>

                                              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Update your Expense</Text>
                                              <View>
                                                <TextInput style={styles.inputs} placeholder='Description' value={description} onChangeText={(value)=> setDescription(value)}/>
                                                <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount}  onChangeText={(value)=> setAmount(value)}/>
                                                <TouchableOpacity onPress={() =>  handleUpdateExpense(item.id)} style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
                                                  <Text style={{ fontSize: 14, textAlign:'center'}}>Update</Text>
                                                </TouchableOpacity>
                                              
                                              </View>
                                            </View>
                                          </View>
                                        </Modal>
                                      </View>
                                    } */}
                                    <View style={{backgroundColor: 'orange', padding: 8, borderRadius: 15, top: 8}}>
                                    <Image style={{ width: 30, height: 30}} source={require('./pencil.png')}/>
                                    </View>
                                  </TouchableOpacity>
                                  
                              
                                  
                                  </View>
                                    
                              {
                                !item.deletedExpense ?
                                  <TouchableOpacity  onPress={() => handleDeleteExpense(item.id, ide[0])}>
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
      margin: 20,
      borderRadius: 10,
      
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
import React, { useState, useEffect }from 'react';
import { ImageBackground, ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryBar, VictoryChart } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { getIncome, cleanItemId, setItemId, getMovements} from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
interface IUpdateStateInc {
  type: string,
  amount: number
}

interface Props {}

const Incomes: React.FC<Props> = () => {

  const dispatch = useAppDispatch()
  const incomes = useAppSelector(state=> state.allMovements.incomes)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)
  
  const itemId= useAppSelector((state)=> state.allMovements.itemId)

  const show: any[] = filter; 
  const [type, setType]= useState('')
  const [amount, setAmount] = useState('')
  const [openModal, setOpenModal] = useState(false)
  
  const incomesFilterDel = incomes.filter((income)=> !income.deletedIncome)
  const mapIncome = incomesFilterDel.map(amount => amount.amount)
  const reduceIncome = mapIncome.reduce((a, b) => a + b, 0)

  //const incexp: any[] = [...incomes]
  
  
  
  // const handleDeleteIncome= (id: number)=>{
    //   const response= await axios.delete(`${base_URL}/movement/income/${id}`)
    // }
  const handleDeleteIncome= async (idinc: number, ide: number)=>{
    const response= await axios.delete(`${base_URL}/movement/income/${idinc}`)
      .then(()=>{  
        dispatch(getIncome(ide))
        dispatch(getAccounts(ide))  
      }
    )
  }
    //esto agregarrrr const filterExpenses= expenses.filter((expense)=> expense.deletedExpense)
    //dispatch(getExpense(ide))
  const handleShowIncome= async(idinc: number, ide: number)=>{
    const response= await axios.put(`${base_URL}/movement/income/${idinc}`)
      .then(()=>{  
       dispatch(getIncome(ide))
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
    itemId && console.log(`${base_URL}/movement/newIncome/${itemId}`);
    itemId &&  await axios.put(`${base_URL}/movement/newIncome/${itemId}`, infoEdit)
  //  .then(response=> console.log(response, 'ESTO ES EL RESPONSE'))
    // .then(data=> {
    //   if(data.description){
    //     console.log(data, 'DAAAAATTTTT');
        
    //     const filter= data.expense.filter((e: any)=> e.id === idExp)
    //     console.log(filter,'TODOOOOOOOOS LOSSSS EXPENSES');
    //   }else{
    //     console.log('fail')
    //   }
    // })
    .then(()=>{
      console.log("este es el dispatch", dispatch(getIncome(ide[0])))
      dispatch(getIncome(ide[0]))
    })
   }

  const colors = ["#5EFC8D","#8EF9F3","#53599A","#ECD444","#FFFFFF","#C42021","#F44708","#CA61C3","#FF958C","#ADFCF9"]

  useEffect(() => {
    dispatch(getAccounts(ide[0]))
    dispatch(getMovements(ide[0]))
    dispatch(getIncome(ide[0]))
  }, [])
   
  const transparent = 'rgba(0,0,0,0.5)'
  const charGraficos = useAppSelector(state=> state.onBoarding.Onboarding)
  const change = charGraficos.change.map(item=> item.name)
  const chart = charGraficos.grafico.map(item => item.name) 
  return (
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Incomes</Text>
          
          <View>
          
              <Text style={styles.text}>{change}{reduceIncome}</Text>
              <VictoryPie
              
                    style={{
                      labels: {
                        fill: '#FFFFFF'
                      }
                    }}
                    innerRadius={110}
                    colorScale={colors}
                    data={incomesFilterDel?.map(e=>{
                      if (e.type){
                      return {x: e.type, y: e.amount}
                      } 
                      // else {
                        //   return {x: e.category, y: e.amount}
                        // }
                      })}
                  />
                    
            </View>
            <FlatList
              data={incomes}
              nestedScrollEnabled
              renderItem={({item, index}) =>{
              if(item.type){
                return <View> 
                          {/* <TouchableOpacity >
                            <Image source={require('./pencil.png')}></Image>
                          </TouchableOpacity> */}
                              <View style={{flexDirection:'row'}}>
                                <Text style={styles.detail}> {item.type}:  {item.amount}  </Text>
                                {
                                  !item.deletedIncome ?
                                    <TouchableOpacity  style={{backgroundColor: '#6071EB', borderRadius: 20, margin: 10, padding: 5}} onPress={() => handleDeleteIncome(item.id, ide[0])}>
                                          <Image style={{width: 30, height: 30}} source={require('./show.png')}/>
                                    </TouchableOpacity>
                                  :
                                    <TouchableOpacity style={{backgroundColor: '#6071EB', borderRadius: 20, margin: 10, padding: 5}} onPress={() => handleShowIncome(item.id, ide[0])}>
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
                                                <TextInput style={styles.inputs} placeholder='Description' value={type} onChangeText={(value)=> setType(value)}/>
                                                <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount}  onChangeText={(value)=> setAmount(value)}/>
                                                <TouchableOpacity onPress={() =>  {handleUpdateIncome()}} style={{backgroundColor: '#6071EB', padding: 10, borderRadius: 10, marginTop: 30, width: 80, alignSelf: 'center'}}>
                                                  <Text style={{ fontSize: 14, textAlign:'center'}}>Update</Text>
                                                </TouchableOpacity>
                                              
                                              </View>
                                              </ImageBackground>
                                            </View>
                                          </View>
                                        </Modal>
                                      </View>
                                    }
                                    <View style={{backgroundColor: 'orange', padding: 8, borderRadius: 15, top: 8}}>
                                    <Image style={{  width: 28, height: 28}} source={require('./pencil.png')}/>
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

export default Incomes;
function useAPPDispatch() {
  throw new Error('Function not implemented.');
}
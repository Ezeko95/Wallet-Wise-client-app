
import React, { useState, useEffect }from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ImageBackground, ListRenderItem } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { getIncome, cleanItemId, setItemId, getMovements, getExpense} from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';



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
  
  const itemId= useAppSelector((state)=> state.allMovements.itemId)

  const show: any[] = filter; 
  const [type, setType]= useState('')
  const [amount, setAmount] = useState('')
  const [openModal, setOpenModal] = useState(false)
  
  const expensesFilterDel = expenses.filter((expense)=> !expense.deletedExpense)
  const mapExpense = expensesFilterDel.map(amount => amount.amount)
  const reduceExpense = mapExpense.reduce((a, b) => a + b, 0)

  //const incexp: any[] = [...expenses]
  
  
  
  // const handleDeleteIncome= (id: number)=>{
    //   const response= await axios.delete(`${base_URL}/movement/income/${id}`)
    // }
    const handleDeleteExpense= async (idinc: number, ide: number)=>{
      const response= await axios.delete(`${base_URL}/movement/expense/${idinc}`)
      .then(()=>{  
        dispatch(getExpense(ide))
        dispatch(getAccounts(ide))  
      }
      )
    }
    //esto agregarrrr const filterExpenses= expenses.filter((expense)=> expense.deletedExpense)
    //dispatch(getExpense(ide))
    const handleShowExpense= async(idinc: number, ide: number)=>{
      const response= await axios.put(`${base_URL}/movement/expense/${idinc}`)
      .then(()=>{  
        dispatch(getExpense(ide))
      }
      )
    }
    
    const handleUpdateExpense= async ()=>{
      const infoEdit: IUpdateStateInc = {
        type,
        amount: parseFloat(amount)
      }
      
      console.log(infoEdit,'QUE INFO LE MANDAMOS AL BAAAACCCCKKKK');
      itemId && console.log(itemId,'QUE ID LE MANDAMOS AL BAAAACCCCKKKK');
      itemId && console.log(`${base_URL}/movement/newIncome/${itemId}`);
      itemId &&  await axios.put(`${base_URL}/movement/newIncome/${itemId}`, infoEdit)
      
      
    .then(()=>{
      console.log("este es el dispatch", dispatch(getExpense(ide[0])))
      dispatch(getExpense(ide[0]))
    })
  }
  
  
  
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
  
  const transparent = 'rgba(0,0,0,0.5)'
  
  useEffect(() => {
    dispatch(getAccounts(ide[0]))
    dispatch(getMovements(ide[0]))
    dispatch(getExpense(ide[0]))
  }, [])
  


  return (
    <View>
        <ImageBackground style={{height: '100%'}} source={require('./assets/bgForm.png')}>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />

        
        <View style={styles.homeCard}>
            <View style={{flexDirection: 'row', marginTop: 40}}>
            <TouchableOpacity onPress={() => navigation.navigate('Income')}>
                <Image style={{width: 50, height: 50, right: 100 }} source={require('./assets/left.png')} />
            </TouchableOpacity>
          <Text style={styles.title}>expenses</Text>
        </View>
          <View style={{backgroundColor: 'white', borderRadius: 100, padding: 3, marginTop: 50, marginBottom: 50}}>
            <View style={{backgroundColor: '#1E2349', borderRadius: 100, paddingLeft: 30, paddingRight: 30}}>
                <Text style={{color: 'white', fontSize: 40, marginTop: 40, marginBottom: 20, textAlign: 'center'}}>Total</Text>
                <Text style={{color: 'white', fontSize: 40, marginBottom: 40, textAlign: 'center', top: -15 }}>${reduceExpense}</Text>
            </View>
          </View>
          {/* <FlatList
            data={expenses}
            nestedScrollEnabled
            renderItem={({item}) =>{
              if(item.type){
               return */}
                        <View> 
                    
                          <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={ () => navigation.navigate('Detail')}>
                              <View style={styles.detail}>
                               
                                <Text style={{fontSize: 20, color: 'white', top: 5, marginLeft:10 }}> {type}:  {amount}  </Text>
                              </View>
                            </TouchableOpacity>

                                {
                                     <TouchableOpacity style={{ borderRadius: 100, margin: 10, }}>
                                        <Image style={{width: 35, height: 35, top: 6, alignSelf: 'center'}} source={require('./assets/delete1.png')}/>
                                    </TouchableOpacity>
                                } 
                                   <TouchableOpacity onPress={() => { setOpenModal(true)}}>
                                    
                                    <View style={{ padding: 8, borderRadius:20, top: 7}}>
                                    <Image style={{ width: 40, height: 40}} source={require('./assets/edit.png')}/>
                                    </View>
                                       


                                    {openModal &&
                                      <View>
                                        <Modal visible={openModal} animationType='slide' transparent={true}>
                                          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent}}>
                                            <View style={{backgroundColor: '#1E2349', padding: 15, width: 300, height: 400, borderRadius:10}}>
                                              <ImageBackground style={{flex: 1}} source={require('./assets/fondoModal.png')}>
                                              <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() =>{ setOpenModal(false), dispatch(cleanItemId())}}>
                                                  <Image style={{width: 40, height: 40, alignItems: 'center'}} source={require('./assets/x.png')}/>
                                              </TouchableOpacity>

                                              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>Update your Income</Text>
                                              <View>
                                                <TextInput style={styles.inputs} placeholder='Type' value={type} onChangeText={(value)=> setType(value)}/>
                                                <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount}  onChangeText={(value)=> setAmount(value)}/>
                                                <TouchableOpacity onPress={() =>  {handleUpdateExpense()}} style={{backgroundColor: '#6071EB', padding: 10, borderRadius: 10, marginTop: 30, width: 80, alignSelf: 'center'}}>
                                                  <Text style={{ fontSize: 14, textAlign:'center', color: 'white'}}>Update</Text>
                                                </TouchableOpacity>
                                              </View>
                                                </ImageBackground>
                                            </View>
                                          </View>
                                        </Modal>
                                      </View>
                                    }
                                  </TouchableOpacity> 
                              
                                  </View>
                                    

                          {/* <Text style={styles.detail}>{item.type}:  {item.amount}  </Text>
                              {
                                !item.deletedIncome ?
                          <TouchableOpacity onPress={() => handleDeleteIncome(item.id, ide[0])}>
                                <Text style={{color: 'white'}}>X</Text>
                          </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => handleShowIncome(item.id, ide[0])}>
                                    <Text style={{color: 'white'}}>Show</Text>
                                </TouchableOpacity>
                              } */}
                          
                      </View>

        </View>
      </ScrollView>
</ImageBackground>
    </View>
  );
};



const styles = StyleSheet.create({
  homeCard: {
    alignItems: 'center',


  },

  title: {
    color: 'white',
    fontSize: 30,
    right: 20,
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



import React, { useState, useEffect }from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ImageBackground } from 'react-native';
import { Colors } from '../../enums/Colors';
import {  getExpense, getMovements} from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { IExpenses } from '../../redux/interfaces/Interface';


interface IUpdateStateInc {
  description: string,
  amount: number
}


const DetailIncome = () => {
  const navigation:(any) = useNavigation();
  

  const dispatch = useAppDispatch()
  const expense = useAppSelector(state=> state.allMovements.expenses)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)
  
  const itemId = useAppSelector((state)=> state.allMovements.itemId)
console.log(itemId, 'itemId');

  const show: any[] = filter; 

  const [category, setCategory]= useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [openModal, setOpenModal] = useState(false)
  
  const expensesFilterDel = expense.filter((income)=> !income.deletedExpense)
  const mapExpense = expensesFilterDel.map(amount => amount.amount)
  const reduceExpense = mapExpense.reduce((a, b) => a + b, 0)
  
  //const incexp: any[] = [...incomes]
  
  
  
  
  
  const [detail, setDetail]= useState<IExpenses>({
    id: 0,
    amount: 0,
    category: '',
    description: '',
    paymentMethod: '',
    logoCategory: '',
    logo: '',
    deletedExpense: false,
    
  })
     
  const handleDeleteExpense = async (idinc: number, ide: number) => {
    const response = await axios.delete(`${base_URL}/movement/expense/${idinc}`);
    if (response.status === 200) {
      dispatch(getExpense(ide));

      dispatch(getAccounts(ide));
      dispatch(getMovements(ide))
      setDetail({
        id: 0,
        amount: 0,
        category: '',
        description: '',
        logoCategory: '',
        logo: '',
        paymentMethod: '',
        deletedExpense: true,
      });

    }
  };
     /* const filterExpenses= expenses.filter((incomes)=> incomes.deletedExpense)
    dispatch(getExpense(ide))
     const handleShowIncome= async(idinc: number, ide: number)=>{
      const response= await axios.put(`${base_URL}/movement/income/${idinc}`)
      .then(()=>{  
        dispatch(getIncome(ide))
      }
      )
    } */
   
    const inc: any = expense?.find(e=> e.id===itemId)

  const handleUpdateExpense = async ()=>{
    const infoEdit: IUpdateStateInc = {
      description,
      amount: parseFloat(amount)
    }

    console.log(infoEdit,'QUE INFO LE MANDAMOS AL BAAAACCCCKKKK');
    itemId && console.log(itemId,'QUE ID LE MANDAMOS AL BAAAACCCCKKKK');
    itemId && console.log(`${base_URL}/movement/newExpense/${itemId}`);
    itemId &&  await axios.put(`${base_URL}/movement/newExpense/${itemId}`, infoEdit)
    .then(()=>{
      console.log("este es el dispatch", dispatch(getExpense(ide[ide.length-1])))
      dispatch(getExpense(ide[ide.length-1]))
      dispatch(getMovements(ide[ide.length-1]))
      
    })
   }


  const logo = () => {
    if (detail.paymentMethod === 'Brubank') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/brubank.png')} />;
    } else if (detail.paymentMethod === 'Mercado Pago') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/mercadopago.jpg')} />;
    }else if (detail.paymentMethod === 'Uala') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/uala.png')} />;
    }
    else if (detail.paymentMethod === 'Cash') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/cash.png')} />;
    }
    else if (detail.paymentMethod === 'Santander Rio') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/rio.jpg')} />;
    }
    
  }

  const logoCategory = () => {
    if (detail.category === 'farmacia') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5, backgroundColor: 'white'}} source={require('./assets/logos/farmacia.png')} />;
    } else if (detail.category === 'supermarket') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/supermarket.jpg')} />;
    }else if (detail.category === 'dinner') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/dinner.png')} />;
    }
    else if (detail.category === 'electrodomestics') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/electrodomestics1.jpg')} />;
    }
    else if (detail.category === 'technology') {
      return <Image style={{width: 50, height: 50, borderRadius: 100, marginLeft: 5, marginTop: 5}} source={require('./assets/logos/technology.jpg')} />;
    }
    
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

    dispatch(getExpense(ide[ide.length-1]))
    inc && setDetail(inc)
  
  }, [])
  



  return (
    <View style={{backgroundColor: '#1C1F3B'}}>
  
    <ScrollView bounces={true}>
      <StatusBar barStyle="light-content" />

      <View style={{width:' 100%', backgroundColor: '#202254', height: 220, borderBottomEndRadius: 50, borderBottomStartRadius: 50}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
                <Image style={{ width: 50, height: 50, left: 30, top: 15 }} source={require('./assets/left1.png')} />
          </TouchableOpacity>
                <Text style={styles.title}>Incomes details</Text>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 35, marginBottom: 10, fontWeight: '300'}}>Total</Text>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 25, fontWeight: 'bold'}}>$ {detail.amount}</Text>
        </View>
      </View>
      <Image style={{alignSelf: 'center', top: 10}} source={require('./assets/line2.png')}/>
      <TouchableOpacity onPress={() => setOpenModal(true)} style={{alignSelf: 'flex-end', top: -245, marginRight: 20}}>
        <View style={{ padding: 8, borderRadius: 20 }}>
          <Image style={{ width: 40, height: 40 }} source={require('./assets/edit.png')} />
        </View>

        {
          openModal &&
          <View>
              <Modal visible={openModal} animationType='slide' transparent={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
                  <View style={{ backgroundColor: '#1E2349', padding: 15, width: 300, height: 400, borderRadius: 10 }}>
                    <ImageBackground style={{ flex: 1 }} source={require('./assets/fondoModal.png') }>
                      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { setOpenModal(false), setDetail(inc) /* dispatch(cleanItemId()) */ }}>
                        <Image style={{ width: 40, height: 40, alignItems: 'center' }} source={require('./assets/x.png')} />
                      </TouchableOpacity>

                      <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Update your Income</Text>
                      <View>

                        <TextInput style={styles.inputs} placeholder='Type' value={description} onChangeText={(value) => setDescription(value)} />
                        <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount} onChangeText={(value) => setAmount(value)} />

                        <TouchableOpacity onPress={() => { handleUpdateExpense() }} style={{ backgroundColor: '#6071EB', padding: 10, borderRadius: 10, marginTop: 30, width: 80, alignSelf: 'center' }}>
                          <Text style={{ fontSize: 14, textAlign: 'center', color: 'white' }}>Update</Text>
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </Modal>
            </View>
        }
      </TouchableOpacity>
        <Text></Text>
      

      <View style={styles.homeCard}>
        

        
        {!detail.deletedExpense && (
  <View>
    <View style={{ alignSelf: 'center' ,width:'90%', top: -20 }}>
      

      <View style={{backgroundColor: '#4D2FE4', width:'100%', top: -40, borderRadius: 40, height: 500}}>
        
          <Text style={{fontWeight: '300', color: 'white', fontSize: 16, marginLeft: 20, marginTop: 20 }}>Description</Text>
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>
            {detail.description}
          </Text>

            
              <Text style={{fontWeight: '300', color: 'white', fontSize: 16, marginLeft: 20, marginTop: 40 }}>Category</Text>
                <View style={{flexDirection: 'row', backgroundColor: '#202254', borderRadius: 100, marginTop: 20, width: '90%', margin: 20, height: 60}}>
                    {logoCategory()}
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginLeft: 30}}>
                      {detail.category}
                    </Text>
                </View>
          
    
          
              <Text style={{fontWeight: '300', color: 'white', fontSize: 16, marginLeft: 20, marginTop: 40 }}>Account</Text>
              <View style={{flexDirection: 'row', backgroundColor: '#202254', borderRadius: 100, marginTop: 20, width: '90%', margin: 20, height: 60}}>
                  {logo()}
                  <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10, marginLeft: 30}}>
                    {detail.paymentMethod}
                  </Text>
              </View>
         
      </View>

    </View>
  </View>
)}
      </View>
      <TouchableOpacity
        style={{ borderRadius: 10, backgroundColor: 'red', width: 120, alignSelf: 'center', padding: 10, }}
        onPress={() => handleDeleteExpense(detail.id, ide[ide.length-1])}
        
      >
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>DELETE</Text>
      </TouchableOpacity>
    </ScrollView>
 
</View>



);                     
};

export default DetailIncome;
    
      
      
  const styles = StyleSheet.create({
    homeCard: {
    


  },

  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    top: -30,
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

function useAPPDispatch() {
  throw new Error('Function not implemented.');
}

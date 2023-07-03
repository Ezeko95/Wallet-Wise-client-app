
import React, { useState, useEffect }from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ImageBackground, Alert, FlatList } from 'react-native';
import { Colors } from '../../enums/Colors';
import { getIncome, cleanItemId, setItemId, getMovements} from '../../redux/slices/allMovementsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { getAccounts } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { IIncome } from '../../redux/interfaces/Interface';


interface IUpdateStateInc {
  type: string,
  amount: number
}



const DetailIncome = () => {
  const navigation:(any) = useNavigation();
  

  const dispatch = useAppDispatch()
  const incomes = useAppSelector(state=> state.allMovements.incomes)
  const idUser = useAppSelector((state) => state.user.user)
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const filter = useAppSelector((state) => state.allMovements.filtered)
  const balance = useAppSelector((state)=> state.allMovements.balance)
  
  const itemId = useAppSelector((state)=> state.allMovements.itemId)
console.log(itemId, 'itemId');

  const show: any[] = filter; 

  const [type, setType]= useState('')
  const [amount, setAmount] = useState('')

  const [openModal, setOpenModal] = useState(false)
  
  const incomesFilterDel = incomes.filter((income)=> !income.deletedIncome)
  const mapIncome = incomesFilterDel.map(amount => amount.amount)
  const reduceIncome = mapIncome.reduce((a, b) => a + b, 0)
  
  //const incexp: any[] = [...incomes]
  
  
  
  const [detail, setDetail]= useState<IIncome>({
    id: 0,
    amount: 0,
    type: '',
    account: '',
    logo: '',
    deletedIncome: false,
    
  })

  const logo = () => {
    if (detail.account === 'Brubank') {
      return <Image style={{width: 60, height: 60, borderRadius: 100, marginLeft: 5, marginTop: 7}} source={require('./assets/logos/brubank.png')} />;
    } else if (detail.account === 'Mercado Pago') {
      return <Image style={{width: 60, height: 60, borderRadius: 100, marginLeft: 5, marginTop: 7}} source={require('./assets/logos/mercadopago.jpg')} />;
    }else if (detail.account === 'Uala') {
      return <Image style={{width: 60, height: 60, borderRadius: 100, marginLeft: 5, marginTop: 7}} source={require('./assets/logos/uala.png')} />;
    }
    else if (detail.account === 'Cash') {
      return <Image style={{width: 60, height: 60, borderRadius: 100, marginLeft: 5, marginTop: 7}} source={require('./assets/logos/cash.png')} />;
    }
    else if (detail.account === 'Santander Rio') {
      return <Image style={{width: 60, height: 60, borderRadius: 100, marginLeft: 5, marginTop: 7}} source={require('./assets/logos/rio.jpg')} />;
    }
    
  }
     
  const handleDeleteIncome = async (idinc: number, ide: number) => {
    const response = await axios.delete(`${base_URL}/movement/income/${idinc}`);
    if (response.status === 200) {
      dispatch(getIncome(ide));
      dispatch(getAccounts(ide));
      dispatch(getMovements(ide))
      navigation.navigate('MyDrawer')

      setDetail({
        id: 0,
        amount: 0,
        type: '',
        account: '',
        logo: '',
        deletedIncome: true
      });

    }
  };
   
  const inc: any = incomes?.find(e=> e.id===itemId)

  const handleUpdateIncome= async ()=>{
    const infoEdit: IUpdateStateInc = {
      type,
      amount: parseFloat(amount)
    }

    console.log(infoEdit,'QUE INFO LE MANDAMOS AL BAAAACCCCKKKK');
    itemId && console.log(itemId,'QUE ID LE MANDAMOS AL BAAAACCCCKKKK');
    itemId && console.log(`${base_URL}/movement/newIncome/${itemId}`);
    itemId &&  await axios.put(`${base_URL}/movement/newIncome/${itemId}`, infoEdit)
    .then(()=>{
      console.log("este es el dispatch", dispatch(getIncome(ide[ide.length-1])))
      dispatch(getIncome(ide[ide.length-1]))
      dispatch(getMovements(ide[ide.length-1]))
      
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

    dispatch(getIncome(ide[ide.length-1]))
    inc && setDetail(inc)
    
  }, [])
  

  
  
  
  
  return (
    <View style={{backgroundColor: '#1C1F3B'}}>
  
    <ScrollView bounces={true}>
      <StatusBar barStyle="light-content" />

      <View style={{width:' 100%', backgroundColor: '#202254', height: 220, borderBottomEndRadius: 50, borderBottomStartRadius: 50}}>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
                <Text style={styles.goBack}>{'<'}</Text>
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

                        <TextInput style={styles.inputs} placeholder='Type' value={type} onChangeText={(value) => setType(value)} />
                        <TextInput style={styles.inputs} placeholder='Amount' keyboardType='numeric' value={amount} onChangeText={(value) => setAmount(value)} />

                        <TouchableOpacity onPress={() => { handleUpdateIncome() }} style={{ backgroundColor: '#6071EB', padding: 10, borderRadius: 10, marginTop: 30, width: 80, alignSelf: 'center' }}>
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
      

      <View style={styles.homeCard}>
        

        
        {!detail.deletedIncome && (
  <View>
    <View style={{ alignSelf: 'center' ,width:'90%', top: -20 }}>
      

      <View style={{backgroundColor: 'white', width:'100%', top: -20, borderRadius: 40, height: 300}}>
        
          <Text style={{fontWeight: '400', color: '#4D2FE4', fontSize: 16, marginLeft: 20, marginTop: 20 }}>Description</Text>
          <Text style={{ fontSize: 30, color: '#202254', fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>
            {detail.type}
          </Text>
    

            <Text style={{fontWeight: '400', color: '#4D2FE4', fontSize: 16, marginLeft: 20, marginTop: 40 }}>Account</Text>
            <View style={{flexDirection: 'row', backgroundColor: '#202254', borderRadius: 100, marginTop: 20, width: '90%', margin: 20, height: 80, borderColor: '#4D2FE4', borderWidth: 3 ,}}>
                {logo()}
                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 20, marginLeft: 30}}>
                  {detail.account}
                </Text>
            </View>
      </View>

    </View>
  </View>
)}
      </View>
      <TouchableOpacity
        style={{ borderRadius: 10, backgroundColor: 'red', width: 120, alignSelf: 'center', padding: 10, marginBottom: 40}}
        onPress={() => handleDeleteIncome(detail.id, ide[ide.length-1])}
        
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
    top: -20
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
  goBack: {
    color: '#4D2FE4',
    backgroundColor: "white",
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    width: 40,
    height: 40,
    borderColor: '#4D2FE4',
    borderWidth: 2,
    left: 30,
    top: 20
},
});

function useAPPDispatch() {
  throw new Error('Function not implemented.');
}


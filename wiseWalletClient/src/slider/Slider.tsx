import React from "react";
import { useRef , useState, useEffect} from "react";
import { View, StyleSheet, Text, Image , TouchableOpacity, ImageSourcePropType, Button, TextInput, Alert, ImageBackground, ScrollView, KeyboardAvoidingView} from "react-native";
import PagerView from "react-native-pager-view";
import { SelectCountry } from 'react-native-element-dropdown';
import {useNavigation} from "@react-navigation/native";
import { Colors } from "../enums/Colors";
import { useAppSelector, useAppDispatch } from '../redux/store';
import { postAccount, AccountData } from "../redux/slices/postAccount";
import { gettingUsers } from "../redux/slices/getUsers";
import Loader from "../components/Loader/Loader";
import Drawer from "../components/drawer/component/Drawer";
import { getAccounts } from "../redux/slices/allMovementsSlice";


const Slider = () => {
  const [showLoader, setShowLoader] = useState(false);
  const ref: any = useRef()
  const dispatch = useAppDispatch()
  const navigation:(any) = useNavigation();
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const accounts = useAppSelector(state => state.allMovements.accounts);
  
  interface Buttons{
    id:number,
    name: string,
    image: ImageSourcePropType
  };

  interface AccountForm {
    total: number,
    name: string,
    totalError?: string;
    nameError?: string;
  }
  
  const selector = useAppSelector((state) => state.user.user) 
  const ide = selector.map(selector => selector.payload.user.id)

  interface SelectAccounts {
    value: string;
    label: string;
    image: {
      uri: string;
    };
  }

  const data: SelectAccounts[] = [
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
  ];


  const [error, setError] = useState<AccountForm>({
    name: '',
    total: 0
  })
  
  const submitAccount = () => {
    setShowLoader(true);
    
    const data: AccountData = {
      name,
      total: parseFloat(total),
    };
    if (ide !== undefined) {
      if(error.nameError || error.totalError){
        Alert.alert('Error in post account, incorrect values')
      }
      
      let totalError = '';
      if(!/^\d+$/.test(total)) {
        totalError= '* Only numbers are allowed'
      }
      
      let nameError = '';
      if(!name){
        nameError = '* Please enter an account'
      }
      
      if(nameError || totalError || !name || !total){
        setShowLoader(false);
      }
      if(!name || !total){
        setShowLoader(false);
        Alert.alert('Error in post account, please complete all fields')
      }
      
      setError({
        ...error,
        nameError: nameError,
        totalError: totalError
      })
      
      
      if (nameError || totalError) {
        
        return;
      }
      dispatch(postAccount(ide[(ide.length)-1], data))
      dispatch(getAccounts(ide[(ide.length)-1]))
      Alert.alert('Successfully created Account');
      setName('');
      setTotal('');
      
      navigation.navigate("MyDrawer")
    }
  };
  
  const onChange = (item: SelectAccounts) => {
    setName(item.label);
    console.log(item.value);
  }
  
  
  useEffect(()=>{
    dispatch(gettingUsers())

  },[dispatch])

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 3000); // Duración de 3 segundos
    }
  }, [showLoader]);

  useEffect(()=>{
    dispatch(getAccounts(ide[(ide.length)-1]))
  },[])
  
  return (
    
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('./assets/fondoCreateAccount2.png')}>

        <ScrollView>
              <KeyboardAvoidingView>
        <View style={{ alignSelf: 'flex-start'}}>

          <Drawer />
        </View>

        { accounts.length === 0 ?
        <Text style={{color: "white", fontSize:25}}>You need to create an account</Text>
          :
        <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
                <Text style={styles.goBack}>{'<'}</Text>
            </TouchableOpacity>
        }
            <View style={{ marginTop: 200, backgroundColor: '#696FE7', width: '80%', alignSelf: 'center', borderRadius: 30, height: 300, justifyContent: 'center'}}>
              {/* <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your Account"></TextInput> */}
              <SelectCountry<SelectAccounts>
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={name}
                data={data}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder={name ? name : "Select Account"}
                onChange={onChange}
                />
              {error.nameError && <Text style={styles.textError}>{error.nameError}</Text>}
               <TextInput style={styles.input} value={total} onChangeText={setTotal} keyboardType="numeric" placeholderTextColor={'white'} placeholder="Amount"></TextInput>
               {error.totalError && <Text style={styles.textError}>{error.totalError}</Text>}
                <TouchableOpacity style={styles.select} onPress={submitAccount}>
                <Text style={{textAlign: "center", color: "#4D2FE4"}}>Create account</Text>
                </TouchableOpacity>
              
              </View>
              {showLoader && <Loader />}
              </KeyboardAvoidingView>
                </ScrollView>
      </ImageBackground>

    

  );
}


export default Slider;

const styles = StyleSheet.create({
  
  select:{
    backgroundColor: "white",
    width: 150,
    height: 35,
    alignSelf: 'center',
    justifyContent: "center",
    padding: 5,
    margin: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4D2FE4',
  },


  input:{
    width: 200,
    height: 40,
    backgroundColor: "#4D2FE4",
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    borderRadius: 100,
    alignSelf: 'center',
    fontSize: 14
    
    
  },
  

  dropdown: {
    margin: 16,
    height: 40,
    width: 200,
    backgroundColor: '#4D2FE4',
    borderRadius: 22,
    paddingHorizontal: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    
  },


  imageStyle: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 12,
    color: 'white'
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textError:{
    color:"white",
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
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
    top: 40
},
});



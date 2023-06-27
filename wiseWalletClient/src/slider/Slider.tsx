import React from "react";
import { useRef , useState, useEffect} from "react";
import { View, StyleSheet, Text, Image , TouchableOpacity, ImageSourcePropType, Button, TextInput, Alert, ImageBackground} from "react-native";
import PagerView from "react-native-pager-view";
import { SelectCountry } from 'react-native-element-dropdown';
import {useNavigation} from "@react-navigation/native";
import { Colors } from "../enums/Colors";
import { useAppSelector, useAppDispatch } from '../redux/store';
import { postAccount, AccountData } from "../redux/slices/postAccount";
import { gettingUsers } from "../redux/slices/getUsers";


const Slider = () => {
  const ref: any = useRef()
  const dispatch = useAppDispatch()
  const navigation:(any) = useNavigation();
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');

  
  interface Buttons{
    id:number,
    name: string,
    image: ImageSourcePropType
  };
  
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

  const submitAccount = () => {
    const data: AccountData = {
      name,
      total: parseFloat(total),
    };
    if (ide !== undefined) {
      console.log(ide, "ATRODEn");
      dispatch(postAccount(ide[(ide.length)-1], data))
      console.log(dispatch(postAccount(ide[0], data)));
      Alert.alert('Successfully created Account');
      setName('');
      setTotal('');
    }
  };

  const onChange = (item: SelectAccounts) => {
    setName(item.label);
    console.log(item.value);
  }

  useEffect(()=>{
    dispatch(gettingUsers())
  },[])

  return (
    <View style={styles.container}>
      <ImageBackground style={{flex: 1, width: '100%'}} source={require('./assets/fondoCreateAccount.png')}>

      <PagerView style={styles.pager} initialPage={0} onPageScroll={(e)=>  console.log(e)} onPageSelected={(e)=> console.log(e)} onPageScrollStateChanged={(e)=> console.log(e)} ref={ref}>
      <View key="1" style={styles.inputContain}>
    
        <Text style={styles.text}>Create an account</Text>

            <View style={styles.containerInput}>
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
                placeholder="Select Account"
                onChange={onChange}
                />
              <TextInput style={styles.input} value={total} onChangeText={setTotal} placeholder="Enter an Amount"></TextInput>
          <TouchableOpacity style={styles.select} onPress={submitAccount}>
          <Text style={{textAlign: "center", color: "white"}}>Crear</Text>
          </TouchableOpacity>
            </View>
          <TouchableOpacity   onPress={()=>{
            ref.current?.setPage(1)
            navigation.navigate("MyDrawer")
          }
          } 
             style={styles.btnContinue}>
            <Text style={{textAlign: "center", color: "white"}}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
      </ImageBackground>
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  inputContain:{
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center"
  },
  select:{
    backgroundColor: "gray",
    width: 150,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    margin: 15,
    borderRadius: 15,
  },
  input:{
    width: 200,
    height: 50,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 100,
    
  },
  containerInput:{
    marginBottom:100 ,
    height: 200,
    width: 300,
    padding: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  indicator:{
    height: 2.5,
    width: 15,
    backgroundColor: "gray"
  },
  touchableOpacity: {
   backgroundColor: "blue"
  },  
  activeTouchableOpacity: {
    backgroundColor:"red  "
  },
  map:{
    textAlign: "right",
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
  },
  text:{
    color: "white",
    fontSize: 22,
    bottom: -50,
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 150,
    height: 150
  },
  pager: {
    flex: 1,
    alignSelf: "stretch",
  },
  btnContinue: {
    backgroundColor: '#5E17EB',
    padding: 5,
    top: -50,
    borderRadius: 15,
    width: 150,
    height: 35,
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
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

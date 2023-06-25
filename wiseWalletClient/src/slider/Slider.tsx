import React from "react";
import { useRef , useState, useEffect} from "react";
import { View, StyleSheet, Text, Image , TouchableOpacity, ImageSourcePropType, Button, TextInput, Alert, ImageBackground} from "react-native";
import PagerView from "react-native-pager-view";
import {useNavigation} from "@react-navigation/native";
import { Colors } from "../enums/Colors";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useDispatch, useSelector } from 'react-redux';
import { postAccount, AccountData } from "../redux/slices/postAccount";
import { RootState, AppDispatch } from '../redux/store';
import { gettingUsers } from "../redux/slices/getUsers";


const Slider = () => {
  const ref: any = useRef()
  const dispatch = useAppDispatch()
  const { loading, error } = useSelector((state: RootState) => state.movement);
  const navigation:(any) = useNavigation();
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [docs, setDocs] = React.useState({});

  const [nie, setNie] = React.useState({
    grafico: {},
    change:{}
  })
  const [ colors, setColors] = React.useState<Array<number>>([]);
  
  interface Buttons{
    id:number,
    name: string,
    image: ImageSourcePropType
  };
  
  const onBoarding: Buttons[] = [
    { id: 1, name: "grafico1", image: require("../Screens/images/grafico1.png")},
    { id: 2, name: "grafico2", image: require("../Screens/images/grafico2.png")},
    { id: 3, name: "dinero", image: require("../Screens/images/dinero.png")},
    { id: 4, name: "euro", image: require("../Screens/images/euro.png")},
    { id: 5, name: "bitcoin", image: require("../Screens/images/bitcoin.png")},

  ]

  const firstOn = onBoarding.slice(0,2);
  const secondOn = onBoarding.slice(2,5);
  const select = (event: Buttons)=>{
    setColors([event.id]);
    setDocs(event)
    if(event.id < 3){
      setNie({
        ...nie,
        grafico: [event]
      })      
      console.log(nie);
    }else if(event.id >= 3){
      setNie({
        ...nie,
        change: [event]
      })
    }
  }
  
  const selector = useAppSelector((state) => state.user.user) 
  const ide = selector.map(selector => selector.payload.user.id)
 
  
  if(selector){

    console.log(ide, "AFUERa");
  }

  // post Account 

  

  const submitAccount = () => {
    const data: AccountData = {
      name,
      total: parseFloat(total),
    };
    if (ide !== undefined) {
      console.log(ide, "ATRODEn");
      
      console.log(dispatch(postAccount(ide[0], data)));
      Alert.alert('Successfully created Account');
      setName('');
      setTotal('');
    }
  };

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
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your Account"></TextInput>
              <TextInput style={styles.input} value={total} onChangeText={setTotal} placeholder="Enter an Amount"></TextInput>
          <TouchableOpacity style={styles.select} onPress={submitAccount}>
          <Text style={{textAlign: "center", color: "white"}}>Crear</Text>
          </TouchableOpacity>
            </View>
          <TouchableOpacity   onPress={()=>  ref.current?.setPage(1)}  style={styles.btnContinue}>
            <Text style={{textAlign: "center", color: "white"}}>Continuar</Text>
          </TouchableOpacity>
            
        </View>

        <View key="2" style={styles.map}>
        <Text style={styles.text}>Choose your Graphic</Text>
        {
          firstOn.map((item, index) => {
            return (
              <View style={styles.map} key={item.id}>
             <TouchableOpacity
              key={item.id}
              onPress={() => select(item)}
              style={[colors.includes(item.id) ? { backgroundColor: "#426581", borderRadius:100 } : null]}
              >
              <Image style={styles.image} source={item.image} />
              </TouchableOpacity>
              </View>
            )         
          })
        }
        </View>
        <View key="3" style={styles.map}>
        <Text style={styles.text}>Choose your exchange</Text>
        {
          secondOn.map((item, index) => {
            return (
              <TouchableOpacity key={item.id} onPress={() => select(item)} style={[colors.includes(item.id) ? { backgroundColor: "#6d92b1", borderRadius:100 } : null]}>
                <Image style={styles.image} source={item.image} />
              </TouchableOpacity>
              )         
            })
          }
          {
            Array.isArray(nie.change) && Array.isArray(nie.grafico)  ?  
            <Button color={"violet"} onPress={() => navigation.navigate('MyDrawer')} title="Continue" />
            : null
          }     
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
  }
});
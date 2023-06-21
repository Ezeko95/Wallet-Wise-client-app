import React from "react";
import { useRef , useState, useEffect} from "react";
import { View, StyleSheet, Text, Image , TouchableOpacity, ImageSourcePropType, Button, TextInput} from "react-native";
import PagerView from "react-native-pager-view";
import {useNavigation} from "@react-navigation/native";
import { Colors } from "../enums/Colors";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Slider = () => {
  const ref = useRef()
  const navigation:(any) = useNavigation();
  
  const user = useAppSelector(state=> state.user.user)
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
   

  return (
    <View style={styles.container}>
      <PagerView style={styles.pager} initialPage={0} onPageScroll={(e)=> console.log(e)} onPageSelected={(e)=> console.log(e)} onPageScrollStateChanged={(e)=> console.log(e)} ref={ref}>
      <View key="1" style={styles.inputContain}>
        <Text style={styles.text}>Create an account</Text>

            <View style={styles.containerInput}>
              <Text style={{color: "white"}}>INPUT</Text>
              <TextInput style={styles.input} placeholder="Ingresa tu cuenta"></TextInput>
              <TextInput style={styles.input} placeholder="Ingresa tu cuenta"></TextInput>
          <TouchableOpacity onPress={()=> ref.current?.setPage(1)} style={styles.select}>
            <Text style={{textAlign: "center", color: "white"}}>Continuar</Text>
          </TouchableOpacity>
            </View>
         
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
            Array.isArray(nie.change) && Array.isArray(nie.grafico)  ?  <Button color={"violet"} onPress={() => navigation.navigate('MyTabs')} title="Continue" />: null
          }     
        </View>
      </PagerView>
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
  },
  input:{
    width: 200,
    height: 50,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 4,

  },
  containerInput:{
    marginBottom:250 ,
    height: 200,
    width: 300,
    padding: 40,
    backgroundColor: "#545470",
    borderRadius: 20,
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
    fontSize: 25
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
  }
});


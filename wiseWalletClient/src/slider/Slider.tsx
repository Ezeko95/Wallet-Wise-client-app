import React from "react";
import { View, StyleSheet, Text, Image , TouchableOpacity, ImageSourcePropType, Button} from "react-native";
import PagerView from "react-native-pager-view";
import {useNavigation} from "@react-navigation/native";

// import HomeScreen from "../Screens/Home";


const Slider = () => {
    const navigation:(any) = useNavigation();
    
  const [docs, setDocs] = React.useState({});

  const [nie, setNie] = React.useState({
    grafico: {},
    change:{}
  })

  interface Colors{
    colors: []
  }

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
  const firstOn = onBoarding.slice(1,2);
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
    console.log(nie);
  }
  return (
    <View style={styles.container}>
      <PagerView style={styles.pager} initialPage={0} >
        <View key="1" style={styles.slide}>
        <Text style={styles.text}>Choose your Graphic</Text>
        {
          firstOn.map((item, index) => {
            return (
              <View style={styles.map} key={item.id}>
             <TouchableOpacity
              key={item.id}
              onPress={() => select(item)}
              style={[colors.includes(item.id) ? { backgroundColor: "#b1cde4" } : null]}
              >
              <Image style={styles.image} source={item.image} />
              </TouchableOpacity>
              </View>
            )         
          })
        }
        </View>
        <View key="2" style={styles.slide}>
        <Text style={styles.text}>Choose your exchange</Text>
        {
          secondOn.map((item, index) => {
            return (
              <TouchableOpacity key={item.id} onPress={() => select(item)} style={[colors.includes(item.id) ? { backgroundColor: "#b1cde4" } : null]}>
                <Image style={styles.image} source={item.image} />
              </TouchableOpacity>
              )         
            })
          }
      <Button onPress={() => navigation.navigate('MyTabs')} title="Continue" />
        </View>
      </PagerView>
    </View>
  );
};
export default Slider;

const styles = StyleSheet.create({
  touchableOpacity: {
   backgroundColor: "blue"
  },
  activeTouchableOpacity: {
    backgroundColor:"red  "
  },
  map:{
    display:"flex",
  },
  text:{
    color: "black",
    fontSize: 25
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200
  },
  pager: {
    flex: 1,
    alignSelf: "stretch",
  }
});




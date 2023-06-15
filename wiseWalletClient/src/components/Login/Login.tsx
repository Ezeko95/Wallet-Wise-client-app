import { StyleSheet, Text, View, Image, ScrollView , TouchableOpacity, ImageBackground, StatusBar} from 'react-native';


const Login = ()=>{
    const image= {uri:"https://w0.peakpx.com/wallpaper/582/539/HD-wallpaper-beautiful-nature-view.jpg"} 
    return(
      
        <View style={styles.scrollContainer}>
              <StatusBar
         animated={true}
         backgroundColor="transparent"
         barStyle={"dark-content"}
         translucent={true}
     />
        <ImageBackground source={image} style={styles.foto}>
        <View style={styles.container}>
        <Image style={styles.img} source={require('../img/logo.png')}/>
        <View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.butonText}>Login</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.butonText}>Register</Text>
        </TouchableOpacity>
        </View> 
          <Text style={styles.h12}>Forgot password?</Text>
            </View>
        </ImageBackground>
      </View>
    )
}
export default Login;

const styles = StyleSheet.create({
    foto:{
        flex: 1,
        padding:20
    },
    butonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "800",
    },
    scrollContainer : {
        flex:1
    },
    container: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      height: 760
    },
    button: {
      margin: 15,
      backgroundColor: "#1b2e50",
      color: "white",
      width: 280,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      borderRadius: 6,
    },
    h1:{
      color: 'white',
    },
    h12:{
      color: 'white',
      paddingBottom: 30
    },
    img: {
      width: 200,
      height: 220
    },
    input: {
      height: 40,
      width: 240,
      margin: 5,
      borderWidth: 1,
      padding: 20,
      backgroundColor: '#fafafa0',
      border: "1px solid white",
      borderRadius: 5,
      color: "#cccccc"
    }
    
  });
  
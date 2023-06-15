import { StyleSheet, Text, View, Image , TouchableOpacity, ImageBackground, StatusBar} from 'react-native';


const Login = ({ navigation}: any )=>{
    
    return(
      <View style={styles.scrollContainer}>
      <StatusBar
       animated={true}
       backgroundColor="transparent"
       barStyle={"dark-content"}
       translucent={true}
       />
      <ImageBackground source={require('../img/fondo2.png')} style={styles.foto}>
      <View style={styles.container}>
      <Image style={styles.img} source={require('../img/logo.png')} />
      <View>
      <TouchableOpacity style={styles.button} onPress={()=>{
        navigation.navigate("Home")
      }}>
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
        height: 900,
       
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
      height: 800
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
      width: 150,
      height: 100
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
    },
    loginView: {
      marginTop: 150
    }
    
  });
  
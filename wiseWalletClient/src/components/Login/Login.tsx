
import { StyleSheet, Text, View, Image, ScrollView , TouchableOpacity, ImageBackground, StatusBar, Button, Alert} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

const LoginButton = () => {
  const {authorize, user} = useAuth0();
  if(user){
    console.log(user)
  }
  const {clearSession} = useAuth0();
  const onPress = async () => {
    if(authorize) {
      try {
        console.log(authorize)
        console.log(user);
        
        await authorize();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const logOut = async () => {
    try {
        await clearSession();
    } catch (e) {
        console.log(e);
    }
};

  return(
    <View style={styles.scrollContainer}>
    <ImageBackground source={require('../img/fondo2.png')} style={styles.foto}>
    <StatusBar
      animated={true}
      backgroundColor="transparent"
      barStyle={"dark-content"}
      translucent={true}
      />
      <View style={styles.container}>
      <Image style={styles.img} source={require('../img/logo.png')} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
           <Text style={styles.butonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logOut}>
           <Text style={styles.butonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.h12}>Forgot password?</Text>
      </View>
      </ImageBackground>
    </View>
  ) 
  
}

export default LoginButton;

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
      height: 600,
    },
    button: {
      margin: 15,
      backgroundColor: "#c29a2b",
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


import { StyleSheet, Text, View, Image, ScrollView , TouchableOpacity, ImageBackground, StatusBar, Button, Alert} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import LogoutButton from './LogOut';

// const Login = ({navigation}:any)=>{
//   const { authorize } = useAuth0();

//   const onPress = async () => {
//     try {
//       await authorize();
//     } catch (e) {
//       console.log(e);
//     }
//   };
//     return(
      
//     //     <View style={styles.scrollContainer}>
//     //           <StatusBar
//     //      animated={true}
//     //      backgroundColor="transparent"
//     //      barStyle={"dark-content"}
//     //      translucent={true}
//     //  />
//     //     <ImageBackground source={require('../img/fondo2.png')} style={styles.foto}>
//     //     <View style={styles.container}>
//     //     <Image style={styles.img} source={require('./img/logo.png')} />
//     //     <View>
//     //     <TouchableOpacity style={styles.button}>
//     //         <Text style={styles.butonText}>Login</Text>
//     //       </TouchableOpacity>
//     //     <TouchableOpacity style={styles.button}>
//     //         <Text style={styles.butonText}>Register</Text>
//     //     </TouchableOpacity>
//     //     </View> 
//     //       <Text style={styles.h12}>Forgot password?</Text>
//     //         </View>
//     //     </ImageBackground>
//     //   </View>
  
//     <Auth0Provider domain="walletwise.us.auth0.com" clientId="o4nR12XFZsF5SOiAbWxHhi3bBEU0DiKp">
//     <View style={styles.container}>
//       <Button onPress={onPress} title="Log in" />
//     </View>
//   </Auth0Provider>
//     )
// }
const LoginButton = () => {
  const {authorize, user} = useAuth0();
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
    <>
    <Button onPress={onPress} title="LOGAIND" />
    <Button onPress={logOut} title="Log out" />
    </>
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
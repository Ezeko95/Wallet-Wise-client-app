import React, { useState } from 'react';
import { View, Button, StyleSheet , TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';

const AuthView: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <View style={{backgroundColor:"black"}}>
        {isLoginView ? <Register /> :  <Login />}
        <TouchableOpacity onPress={handleToggleView} style={styles.botonRegister}>
          {isLoginView ? <Image source={require('./images/btnSignUp.png')}/> :<Text style={{color:"white",  textAlign:"center", fontWeight: '700'}}>REGISTER</Text>}
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({

  botonRegister:{
    width: 200,
    position: "absolute",
    bottom: 8,
    left:100,
    backgroundColor: "#4285F4",
    borderRadius:10,
    height: 50 ,
    justifyContent: "center"
  }
})

export default AuthView;
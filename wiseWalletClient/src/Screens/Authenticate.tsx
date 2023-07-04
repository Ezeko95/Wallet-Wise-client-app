import React, { useState } from 'react';
import { View, StyleSheet , TouchableOpacity, Text, Image, ScrollView} from 'react-native';
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
          {isLoginView ? <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Sign In</Text> : <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Sign Up</Text>}
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({

  botonRegister:{
    width: 150,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: "#4285F4",
    borderRadius:10,
    height: 50 ,
    justifyContent: "center",
    top: "90%"
  }
})

export default AuthView;
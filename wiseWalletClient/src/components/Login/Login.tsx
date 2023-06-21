import { Text, TextInput,View, Button, StyleSheet, ImageBackground , Image ,KeyboardAvoidingView, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation:(any) = useNavigation();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const handleInputChange = (name: keyof LoginForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/login',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data);
      console.log('Login successful');
      await AsyncStorage.setItem('accessToken', accessToken);
      navigation.navigate('Slider');
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  return (
      <ImageBackground source={{uri:"https://us.123rf.com/450wm/virtosmedia/virtosmedia2302/virtosmedia230276138/199275054-silueta-de-un-%C3%A1rbol-sobre-un-fondo-de-puesta-de-sol-ilustraci%C3%B3n-vectorial.jpg?ver=6"}} 
 >
  <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image}/>
      <Text style={styles.text}>Login</Text>
      {error && <Text>{error}</Text>}
      <TextInput
        // style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={value => handleInputChange('email', value)}
        style={styles.input}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleInputChange('password', value)}
        />
      <Button title="Login" onPress={()=>{
        handleSubmit()
      }} color={"black"}/>
    </View>
      </KeyboardAvoidingView>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  image:{
    height:250,
    width: 250
  },
  input:{
    backgroundColor:"white",
    padding:10,
    margin:10,
    borderRadius:10,
    width:300,
    height:45,
    color:"black",
    fontSize:20,
    fontWeight:"bold",
  },
  container: {
    height: "95%",
    paddingBottom:79,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reg: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  text:{
    color:"white",
    fontSize:20,
    fontWeight:"bold",
  }
});

export default Login;

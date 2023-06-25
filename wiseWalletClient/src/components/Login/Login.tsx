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
  const [storage, setStorage] = useState(false)
  const [login , setLogin] = useState(false)
  const local = async()=>{
    try {
      
      const accesTokken = await  AsyncStorage.getItem("accessToken");
      if(accesTokken){
        setStorage(true)
      }
    } catch (error) {
      console.log(error);
      
    }
  } 
  local()
  const handleSubmit = async () => {  try {
    
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/login',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data);
      console.log('Login successful');
      await AsyncStorage.setItem('accessToken', accessToken);
      setLogin(true)
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  return (
      <ImageBackground source={{uri:"https://w0.peakpx.com/wallpaper/525/971/HD-wallpaper-geometric-fade-bright-colourful-geometric.jpg"}} 
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
        {
         storage === true && login === true ? navigation.navigate('Slider') :  navigation.navigate('MyDrawer')
        }
        
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
    height: 624,
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

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Image, ImageBackground, KeyboardAvoidingView,Platform, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Upload from './Upload';
import { useAppDispatch, useAppSelector } from '../../redux/store';
interface RegisterForm {
  name: string;
  email: string;
  password: string;
  picture: string;
}

const Register: React.FC = () => {
  const navigation: (any) = useNavigation();
  const [form, setForm] = useState<RegisterForm>({

    name: '',
    email: '',
    password: '',
    picture: ''
    
  });
  const [error, setError] = useState<string>('');
  const handleInputChange = (name: keyof RegisterForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(console.log(form,'INFO AL FORMULARIOOOO'));
    
    try {
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/register',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data, "register");
      console.log('Register successful');
      // Save the access token in AsyncStorage or a secure storage
      await AsyncStorage.setItem('accessToken', accessToken);
      navigation.navigate('Slider')
      // Call the onRegister function from props to handle the registration action
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  console.log(form);
  
  return (
    <ImageBackground source={require('./fondoIntro2.png')}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image}/>
     
      <Text style={styles.text}>Register</Text>
      <KeyboardAvoidingView>
      {/* <TouchableOpacity style={{display:"flex",alignItems:"center", }}  >
        <Image source={{uri:'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachadd.jpg'}} style={styles.imageperfil}/>
        <Text style={{color:"white"}}>CHOOSE YOUR FOTOU</Text>
      </TouchableOpacity> */}
      <Upload handleInputChange={handleInputChange}/>
      <TextInput
        placeholder="Username"
        value={form.name}
        onChangeText={value => handleInputChange('name', value)}
        style={styles.input}
        />
      {/* <TextInput
        placeholder="picture"
        value={form.picture}
        onChangeText={value => handleInputChange('picture', value)}
        style={styles.input}
        /> */}
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={value => handleInputChange('email', value)}
        style={styles.input}
        />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleInputChange('password', value)}
        style={styles.input}
        />
        </KeyboardAvoidingView>
      <Button title="Register" onPress={()=>{
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
    width: 250,
    position: "relative",
    top: 60
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
    height: "100%",
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
  },
  imageperfil:{
    height: 100,
    width: 100,
    borderRadius: 200,
    margin: 20
  }
});


export default Register;
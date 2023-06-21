import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Image, ImageBackground, KeyboardAvoidingView,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigation: (any) = useNavigation();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (name: keyof RegisterForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(console.log(form));
    
    try {
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/register',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data);
      console.log('Register successful');
      // Save the access token in AsyncStorage or a secure storage
      await AsyncStorage.setItem('accessToken', accessToken);
      // Call the onRegister function from props to handle the registration action
      navigation.navigate('Slider')
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <ImageBackground source={{uri:"https://us.123rf.com/450wm/virtosmedia/virtosmedia2302/virtosmedia230276138/199275054-silueta-de-un-%C3%A1rbol-sobre-un-fondo-de-puesta-de-sol-ilustraci%C3%B3n-vectorial.jpg?ver=6"}}>
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >


    <View style={styles.container}>
      <Image source={require("./logo.png")} style={styles.image}/>
      <KeyboardAvoidingView>

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


export default Register;
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Upload from './Upload';
import { useAppDispatch } from '../../redux/store';
import { gettingUsers } from '../../redux/slices/getUsers';
import Loader from '../Loader/Loader';


interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<RegisterForm>({
    name: '',
    password: '',
    email: '',
  });

  const handleInputChange = (name: keyof RegisterForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));

    setError(prevState => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleSubmit = async () => {
    
    let nameError = '';
    if (!form.name) {
      nameError = '* Please enter a username';
    }

    let emailError = '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      emailError = '* Please enter a valid email address';
    }

    let passwordError = '';
    if (!/^\w{8,16}$/.test(form.password)) {
      passwordError = '* The password must be between 8 and 16 characters';
    }

    setError({
      ...error,
      email: emailError,
      password: passwordError,
      name: nameError,
    });

    if (emailError || passwordError) {
      return;
    }

    try {
      setShowLoader(true);
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/register',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data, 'register');
      console.log(response.data, 'register');
      console.log('Register successful');
      // Save the access token in AsyncStorage or a secure storage
      await AsyncStorage.setItem('accessToken', accessToken);
      console.log(dispatch(gettingUsers), 'ESTE ES EL DISPATCH DE REGISTER');
      navigation.navigate('Slider');
      setForm({
        name: '',
        email: '',
        password: '',
      })
      // Call the onRegister function from props to handle the registration action
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000); // Duración de 3 segundos
    }
  }, [showLoader]);
  

    return (
      
      <ImageBackground source={require('./assets/signUp3.png')}>


      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <KeyboardAvoidingView>
            {/* <TouchableOpacity style={{display:"flex",alignItems:"center", }}  >
        <Image source={{uri:'https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachadd.jpg'}} style={styles.imageperfil}/>
        <Text style={{color:"white"}}>CHOOSE YOUR FOTOU</Text>
      </TouchableOpacity> */}
            <Upload handleInputChange={handleInputChange} />

            <TextInput
              placeholder="* Username"
              value={form.name}
              onChangeText={value => handleInputChange('name', value)}
              style={styles.input}
            />
            {error.name && <Text style={styles.textError}>{error.name}</Text>}
            {/* <TextInput
        placeholder="picture"
        value={form.picture}
        onChangeText={value => handleInputChange('picture', value)}
        style={styles.input}
      /> */}

      <TextInput
        placeholder="* Email"
        value={form.email}
        onChangeText={value => handleInputChange('email', value)}
        style={styles.input}
        />
        {error.email && <Text style={styles.textError}>{error.email}</Text>}
      <TextInput
        placeholder="* Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleInputChange('password', value)}
        style={styles.input}
        />
        {error.password && <Text style={styles.textError}>{error.password}</Text>}
        </KeyboardAvoidingView>
      <TouchableOpacity style={{padding: 12, marginTop: 10, backgroundColor: '#1b7ced', borderRadius: 10}} onPress={()=>{ handleSubmit()}}>
        <Text style={{color:'white', fontWeight:'700'}}>Sign up</Text>
      </TouchableOpacity>
      <Text style={{top: 30, color: 'white', textAlign: 'center'}}>Do you already have an account?  Sign in here!</Text>
    </View>
      
      </KeyboardAvoidingView>
      {showLoader && <Loader />}
    </ImageBackground>
  );

}


const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 100,
    width: 300,
    height: 40,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container: {
    height: '100%',
    top: -10,
    width: '100%',
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
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textError: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});

export default Register;

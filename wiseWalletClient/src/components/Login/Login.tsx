import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { gettingUsers } from '../../redux/slices/getUsers';
import { useAppDispatch } from '../../redux/store';


interface LoginForm {
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<LoginForm>({
    password: '',
    email: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (name: keyof LoginForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));

    setError(prevError => ({
      ...prevError,
      [name]: '',
    }));

    setIsButtonDisabled(false);
  };

  const [storage, setStorage] = useState(false);
  const [login, setLogin] = useState(false);
  const local = async () => {
    try {
      const accesTokken = await AsyncStorage.getItem('accessToken');

      if (accesTokken) {
        setStorage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (error.emailError || error.passwordError) {
      Alert.alert('Error in login data, incorrect email or password');
      return;
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
      emailError: emailError,
      passwordError: passwordError,
    });

    if (emailError || passwordError) {
      setIsButtonDisabled(true);
      return;
    }

    try {
      const response = await axios.post<{ accessToken: string }>(
        'http://10.0.2.2:3001/user/login',
        form,
      );
      const { accessToken } = response.data;
      console.log(response.data);
      console.log('Login successful');
      await AsyncStorage.setItem('accessToken', accessToken);
      console.log(dispatch(gettingUsers()), 'este es DISPATCH DE LOGIN');
      navigation.navigate('MyDrawer');
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <ImageBackground source={require('./assets/signIn3.png')} 
>
      <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={styles.container}>
        <Image source={require("./assets/logo.png")} style={styles.image}/>

      <TextInput
        style={styles.input}
        placeholder="*Email"
        value={form.email}
        onChangeText={value => { handleInputChange('email', value)}}
        />
        {error.emailError && <Text style={styles.textError}>{error.emailError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="* Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => { handleInputChange('password', value)}}
        />
        {error.passwordError && <Text style={styles.textError}>{error.passwordError}</Text>}

        <TouchableOpacity  style={{padding: 12, marginTop: 10, backgroundColor: '#1b7ced', borderRadius: 10}} onPress={() => { handleSubmit()}} disabled={isButtonDisabled}>
          <Text style={{color:'white', fontWeight:'700'}}>Sign In</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
        
          <Text style={{top: 50, color: 'white', textAlign: 'center'}}>You don't have an account yet?  Sign up here!</Text>
        </View>
      </View>
      </KeyboardAvoidingView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: 400,
    top: 90,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
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
    paddingBottom: 90,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
  },
  reg: {
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

export default Login;

import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
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
      navigation.navigate('Home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {error && <Text>{error}</Text>}
      <TextInput
        // style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <TextInput
        // style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleInputChange('password', value)}
      />
      <Button title="Login" onPress={()=>{
        handleSubmit()
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  reg: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default Login;

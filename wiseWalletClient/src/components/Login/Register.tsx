import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

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
    picture: "",
  });
  console.log(form)
  const [error, setError] = useState<string>('');

  const handleInputChange = (name: keyof RegisterForm, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
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
      navigation.navigate('Home')
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={form.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <TextInput
        placeholder="picture"
        value={form.picture}
        onChangeText={value => handleInputChange('picture', value)}
      />
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => handleInputChange('password', value)}
      />
      <Button title="Register" onPress={()=>{
        handleSubmit()
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
    }
})


export default Register;
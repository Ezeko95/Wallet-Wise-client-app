import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';

const AuthView: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <View style={{backgroundColor:"black"}}>
      {isLoginView ? <Login /> : <Register />}
      <Button
        title={isLoginView ? 'Switch to Register' : 'Switch to Login'}
        onPress={handleToggleView}
      />
    </View>
  );
};

export default AuthView;
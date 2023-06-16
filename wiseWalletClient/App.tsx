import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/Navigation/HomeStack'

function App(): JSX.Element {
  return (
    <NavigationContainer>
        <Navigator />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 900,
  },
});

export default App;

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/Navigation/HomeStack'
import { Provider } from 'react-redux';
import {store} from "./src/redux/store";

function App(): JSX.Element {
  return (
  <Provider store={store}>
    <Navigator/>
  </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 900,
  },
});

export default App;

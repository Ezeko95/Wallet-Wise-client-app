import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Navigate from './src/navigate/Navigate';
import { Provider } from 'react-redux';
import store from "./src/redux/store";

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigate/>
      </Provider>
    </View>
)}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});


export default App;

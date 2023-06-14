/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as  React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormExpenses from './src/views/FormExpenses/FormExpenses';


const App = () => {
  return (
      <View style={styles.form}>
        <FormExpenses />
      </View>
  )
  
}

export default App;

const styles = StyleSheet.create({
  App:{
    
  },
    form:{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#181729',
      
    }
})

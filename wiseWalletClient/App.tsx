import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Navigate from './src/navigate/Navigate';


function App(): JSX.Element {
  return (
   <View style={styles.container}>
    <Navigate/>
   </View>
  );
}
const styles = StyleSheet.create({
  container:{
    height: 900,
  }
});

export default App;
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
import FormIncome from './src/components/formIncome/FormIncome';
import { Provider } from 'react-redux';
import {store} from "./src/redux/store";

function App(): JSX.Element {
  return (
    <View>
      <FormIncome />
    </View>
  )
    {/* <Provider store={store}>
   <View style={styles.container}>
    <Navigate/>
   </View>
    </Provider>  */}
}
const styles = StyleSheet.create({
  container:{
    height: 900,
  }
});

export default App;
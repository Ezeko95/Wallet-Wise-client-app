import React from 'react';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
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
        <View>
          <FormIncome />
        </View>    
      <Auth0Provider domain={"walletwise.us.auth0.com"} clientId={"o4nR12XFZsF5SOiAbWxHhi3bBEU0DiKp"}>
        <Provider store={store}>
          <View style={styles.container}>
            <Navigate/>
          </View>
        </Provider> 
        </Auth0Provider>
      </View> 
)}
const styles = StyleSheet.create({
  container:{
    height: 900,
  }
  
});


export default App;

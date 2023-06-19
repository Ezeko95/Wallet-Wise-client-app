import React from 'react';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import Navigate from './src/navigate/Navigate';
import MyTabs from './src/tabs/Tabs';
import { Provider } from 'react-redux';
import store from "./src/redux/store";

function App(): JSX.Element {
  return (
    <Provider store={store}>
    <View>  
      <Auth0Provider domain={"walletwise.us.auth0.com"} clientId={"o4nR12XFZsF5SOiAbWxHhi3bBEU0DiKp"}>
        <Provider store={store}>
          <View style={styles.container}>
            {/* <Navigate/> */}
            <MyTabs />
          </View>
        </Provider> 
        </Auth0Provider>
      </View> 
      </Provider>
)}


const styles = StyleSheet.create({
  container:{
    height: '100%',
  }
});


export default App;

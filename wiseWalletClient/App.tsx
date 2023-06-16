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

import Navigator from './src/Navigation/HomeStack'
import { Provider } from 'react-redux';
import {store} from "./src/redux/store";
import Navigate from './src/navigate/Navigate';

function App(): JSX.Element {
  return (

    <Auth0Provider domain={"walletwise.us.auth0.com"} clientId={"o4nR12XFZsF5SOiAbWxHhi3bBEU0DiKp"}>
  <Provider store={store}>
    <Navigate/>
  </Provider>
  </Auth0Provider>


  );
}


export default App;

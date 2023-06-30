import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import Navigate from './src/navigate/Navigate';
import { Provider } from 'react-redux';
import store from "./src/redux/store";

function App(): JSX.Element {
  return (
    <StripeProvider
    publishableKey='pk_test_51NORIxCelYUlowq6q2AGvya8lJ8xQvmoU2Q7lkwxaF4Kj0lvfi7ingHgn6pTysiVlAyTgfd1p0r05QAcGDFvktSB00g4xOI53P'
    >
    <View style={styles.container}>
      <Provider store={store}>
        <Navigate/>
      </Provider>
    </View>
    </StripeProvider>
)}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});


export default App;

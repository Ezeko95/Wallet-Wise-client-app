/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import Login from "./src/components/Login/Login";

import React from 'react';
import {
  SafeAreaView,

  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View>
        <Text style={styles.sectionTitle}>Wise Wallet</Text>
        <View style={styles.content}>
            <Text style={styles.sectionDescription}>Home</Text>
            <Text style={styles.sectionDescription}>Shared</Text>
            <Text style={styles.sectionDescription}>New</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}


export default App;
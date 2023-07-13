import { StyleSheet, Text, View } from 'react-native';
import FormPager from './Pager';
import { Colors } from '../../enums/Colors';
import React from 'react';
import Pager from './Pager';

const Home = () => {
  return (
    <View style={styles.containter}>
      <Pager />
    </View>
  );
};

const styles = StyleSheet.create({
  containter:{
    backgroundColor: Colors.BACKGROUND_COLOR,
  }
})

export default Home;

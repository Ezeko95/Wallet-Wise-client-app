import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewScreen = () => {
  return (
    <View style={styles.newCard}>
      <Text>New Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  newCard: {
    backgroundColor: '#efefef',
  },
});

export default NewScreen;

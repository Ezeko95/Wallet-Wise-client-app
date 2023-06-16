import { View, Text, StyleSheet } from 'react-native';

const SharedScreen = () => {
  return (
    <View>
      <Text>Shared Expenses</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sharedCard: {
    backgroundColor: '#efefef',
  },
});

export default SharedScreen;

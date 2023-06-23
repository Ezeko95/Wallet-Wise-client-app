import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import { Text } from 'victory-native';

const Drawer = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => (
    <View style={styles.container}>
      <Button title="close" onPress={() => drawer.current?.closeDrawer()} />
      <Text>Home</Text>
      <Text>Add</Text>
      <Text>Profile</Text>
      <Text>Shared</Text>
      <Text>Currency</Text>
      <Text>About us</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      renderNavigationView={navigationView}
    >
      <Button
        title='open'
        onPress={() => drawer.current?.openDrawer()}
      />

    </DrawerLayoutAndroid>
  )
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  }
})

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";
import Home from '../components/home/Home'
import Pager from '../components/home/Pager'
import { Colors } from '../enums/Colors'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

    return (
      <View style={styles.container}>
        <Home />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND_COLOR
  },
})

export default HomeScreen;


import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.homeCard}>
            <Text>Home Screen</Text>
        </View>

import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../components/Login/Login";
const Tab = createBottomTabNavigator();
import Icon from "react-native-ionicons";

const HomeScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" size={size} color={color} />
                    ),
                  }}
            />
            <Tab.Screen
                name="Profile"
                component={Login}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    homeCard: {
        backgroundColor: '#efefef'
    }
})


export default HomeScreen
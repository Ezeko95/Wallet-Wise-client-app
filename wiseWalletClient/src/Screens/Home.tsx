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
            {/* <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                    ),
                  }}
            />
            <Tab.Screen
                name="Profile"
                component={Login}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                    ),
                }} */}
            {/* /> */}
        </Tab.Navigator>
    )
}

export default HomeScreen
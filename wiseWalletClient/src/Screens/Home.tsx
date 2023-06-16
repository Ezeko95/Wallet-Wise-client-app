import { View, Text , ScrollView, StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../components/Login/Login";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {

    const gastos = {
        montoA: 'comida',
        montoB: 'gato',
        montoC: 'perro',
        montoD: 'luz',
        montoE: 'agua',
        montoF: 'gas',
    }

    const montos = {
        montoA: 40,
        montoB: 50,
        montoC: 20,
        montoD: 30,
        montoE: 25,
        montoF: 55
    }

    return (
        <>
        <View style={styles.homeCard}>
                    <Text style={styles.title}>Home Screen</Text>
                </View>
        </>
        // <ScrollView
        //     bounces={true}
        // >
        //     <Tab.Screen
        //         name="Home"
        //         component={HomeScreen}
        //         options={{
        //             tabBarLabel: "Home",
        //             tabBarIcon: ({ color, size }) => (
        //               <Icon name="home" size={size} color={color} />
        //             ),
        //           }}
        //     />
        //     <Tab.Screen
        //         name="Profile"
        //         component={Login}
        //         options={{
        //             tabBarLabel: "Profile",
        //             tabBarIcon: ({ color, size }) => (
        //               <Icon name="home" size={size} color={color} />
        //             ),
        //         }}
        //     />
        // </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    homeCard: {
        alignItems: 'center',
        backgroundColor: '#171738'
    },
    
    title: {
        color: '#a0a0a0',
        fontSize: 30,
    }, 

    chart: {
        marginTop: 40,
        height: 250,
        width: 250
    },

    detail: {
        width: 250,
        borderColor: 'black',
        backgroundColor: '#7180b9',
        margin: 10,
        borderRadius: 15,
        color: '#fff',
        fontSize: 25,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})


export default HomeScreen
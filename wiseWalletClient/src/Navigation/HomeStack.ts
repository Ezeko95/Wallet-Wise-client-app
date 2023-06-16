import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Screens/Home";
import NewScreen from "../Screens/New";
import Login from "../components/Login/Login";

const screens = {
    Home: {
        screen: HomeScreen
    },
    New: {
        screen: NewScreen
    }
}


const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)
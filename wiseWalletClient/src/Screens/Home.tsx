import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.homeCard}>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeCard: {
        backgroundColor: '#efefef'
    }
})


export default HomeScreen
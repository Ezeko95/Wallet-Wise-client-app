import { Button , TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
const LogoutButton = () => {
    
    const navigation:any = useNavigation()
    const onPress = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            console.log('Elemento eliminado de AsyncStorage');
            navigation.navigate('Login')
          } catch (error) {
            console.log('Error al eliminar el elemento de AsyncStorage:', error);
          }
    };

    return(
        <>
        <View style={{marginTop: 60, width: '90%', justifyContent: 'center'}}>

        <TouchableOpacity onPress={onPress} style={styles.buton}>
            <Text style={{color: "white", textAlign: "center", fontSize: 25}}>Log Out </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton}>
        <Text style={{color: "white", textAlign: "center", fontSize: 25}}>Premium 👑</Text>
    </TouchableOpacity>
        </View>
    
    </>
    )
}
export default LogoutButton;

const styles = StyleSheet.create({
    buton:{
        backgroundColor: "#31316d",
        height: 50,
        justifyContent: "center", alignItems:"center",
        margin: 6,
        borderRadius: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'white'
    }
})
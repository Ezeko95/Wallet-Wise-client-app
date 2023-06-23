import { Button , TouchableOpacity, Text, StyleSheet} from 'react-native';
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
        <TouchableOpacity onPress={onPress} style={styles.buton}>
            <Text style={{color: "white", textAlign: "center", fontSize: 25}}>LOG OUT🔚</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buton}>
        <Text style={{color: "white", textAlign: "center", fontSize: 25}}>PREMIUM👑</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buton}>
        <Text style={{color: "white", textAlign: "center", fontSize: 25}}>REDIRIGIR A LCDTM🦄</Text>
    </TouchableOpacity>
        </>
    )
}

export default LogoutButton;

const styles = StyleSheet.create({
    buton:{
        backgroundColor: "#31316d",
        height: 50,
        justifyContent: "center", alignItems:"center",
        margin: 6
    }
})
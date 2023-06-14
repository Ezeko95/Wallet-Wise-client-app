import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, TouchableOpacity} from 'react-native';




const FormExpenses = () => {
    return (

        <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput placeholder='Category' style={styles.input}></TextInput>
                    <TextInput placeholder='Amount' style={styles.input}></TextInput>
                    <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>
                    </View>
                </View>
        </View>
    );
}

export default FormExpenses;

const styles = StyleSheet.create({
    form:{
        borderRadius: 15,
        padding: 30,
        top: 50,
        backgroundColor:'#150a84',
        height: 300,
       
    },
    input:{
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        margin: 15,
        height: 40,
        width: 200,
        fontSize: 20,
    },
    container:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        backgroundColor:'#181729',  
    },
    button:{
        color: 'white',
        backgroundColor: '#0b3ce0',
        borderRadius: 10,
        padding:5,
        top:20,
        width:100,
    },
    textButton:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
})
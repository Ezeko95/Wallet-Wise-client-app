import { View,Text, TextInput, StyleSheet, TouchableOpacity, Image} from "react-native";
import Dropdown from "./Dropdown";
import React, { FunctionComponent } from 'react'
import { colors } from '../colors/Colors'
import { useState } from "react";



const NewExpense: FunctionComponent = () => {

    const [type, setType] = useState();
    const [amount, setAmount] = useState();
    return (

        <View style={styles.view}>
            <Text style={styles.text}>Add Income</Text>

            <View>
                <TextInput
                    style={styles.input}
                    
                    
                    
                    placeholder="Type"
                />
                <TextInput
                    style={styles.input}
                    
                    placeholder="Amount"
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
        </View>
    

        
    )
}

export default NewExpense;

const styles = StyleSheet.create({
        view:{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${colors.blue}`,

        },
        input:{
            height: 40,
            width: 300,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            backgroundColor: `${colors.softBlue}`,
            fontSize: 14,
        },
        text:{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 10,
            marginBottom: 10,
            textAlign: 'center'
        },
        button:{
            backgroundColor: `${colors.lightblue}`,
            padding: 10,
            width: 100,
            marginTop: 20,
            borderRadius: 15,
            borderColor:`${colors.softBlue}`,
        },
        btnText:{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
        },
  });
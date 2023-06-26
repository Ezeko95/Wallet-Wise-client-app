import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Pager from './Pager';


const FormIncome = () => {
    return (
    <ImageBackground style={styles.fondo} source={require('./assets/bgForm.png')}>
            <View style={styles.view}>
                <Pager />
            </View>
            </ImageBackground>
    )
}

export default FormIncome;

const styles = StyleSheet.create({
    view:{
        height: '100%',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    fondo:{
            flex: 1,
            height: '100%',
            
        }
})
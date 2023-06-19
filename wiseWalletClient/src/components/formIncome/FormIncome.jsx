import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pager from './Pager';

const FormIncome = () => {
    return (
            <View style={styles.view}>
                <Pager />
            </View>
    )
}

export default FormIncome;

const styles = StyleSheet.create({
    view:{
        height: '100%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#202254',
        justifyContent: 'center',
    }
    
})
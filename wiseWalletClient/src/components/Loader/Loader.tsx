import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native'


const Loader = () => {
    return(
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('./assets/loader2.json')} autoPlay={true} loop={true}/>
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1,
        height: '100%'
    }
})
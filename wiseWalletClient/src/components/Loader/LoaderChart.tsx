import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native'


const LoaderChart = () => {
     

    return(
      
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('./assets/chart3.json')} autoPlay={true} loop={true}/>
        </View>
    )
}

export default LoaderChart;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: '#1C1F3B',
        zIndex: 1,
        height: '100%'
    }
})
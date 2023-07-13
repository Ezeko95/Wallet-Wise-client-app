import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from 'lottie-react-native'


const LoaderWelcome = () => {
     

    return(
      
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('./assets/welcome.json')} autoPlay={true} loop={true}/>
        </View>
    )
}

export default LoaderWelcome;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignitems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: 1,
        height: '100%'
    }
})
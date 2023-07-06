import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native'


const LoaderShared = () => {
     

    return(
      
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Text style={{marginTop:60, color: 'white', fontSize: 25, textAlign: 'center'}}>You can unlock the option to create shared expenses</Text>
            <LottieView source={require('./assets/share.json')} autoPlay={true} loop={true}/>
        </View>
    )
}

export default LoaderShared;

const styles = StyleSheet.create({
    container: {
        marginBottom: '100%'
    }
})
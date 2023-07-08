import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native'


const LoaderGoals = () => {
     

    return(
      
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <Text style={{marginTop:-30, color: 'white', fontSize: 25, textAlign: 'center'}}>And also the section to create goals</Text>
            <LottieView source={require('./assets/goals.json')} autoPlay={true} loop={true}/>
        </View>
    )
}

export default LoaderGoals;

const styles = StyleSheet.create({
    container: {
        marginTop: '170%',
        
    }
})
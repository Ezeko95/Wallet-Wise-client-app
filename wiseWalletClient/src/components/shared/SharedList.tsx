import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../../enums/Colors';

const SharedList: React.FC = () => {

    const navigation: any = useNavigation();

    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
        <Text  style={styles.goBack}>{'<'}</Text>
      </TouchableOpacity>
            
            <View style={styles.allItems}>
                <TouchableOpacity style={styles.create} onPress={() => navigation.navigate('NewShared')}>
                    <Text style={{color: 'white', fontSize: 40}}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SharedList

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BACKGROUND_COLOR,
        flex: 1,
        height: '100%',
        width: '100%'
    },
    create: {
        backgroundColor: 'darkslateblue',
        borderRadius: 15,
        width: '40%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#A16AE2',
        borderWidth: 1,
        position: 'relative',
        margin: 20
      },
      allItems: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      },
      goBack: {
        color: 'black',
        backgroundColor: "yellow",
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        width: 40,
        height: 40,
        borderColor: '#FFF7AE',
        borderWidth: 2,
        left: 10,
        top: 10   
    }
})
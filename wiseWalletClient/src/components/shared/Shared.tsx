import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from "../../enums/Colors";

const Shared = () => {

    const [room, setRoom] = useState<string>("")

    const onChangeTitle = (value: string) => {
        setRoom(value)
    }
    
    return(
        <View style={styles.container}>
            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                New Shared
            </Text>
            <TextInput
                value={room}
                onChangeText={value => onChangeTitle(value)}
                style={styles.input}
                placeholder="roomName..."
            />
        </View>
    )
};

export default Shared;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.BACKGROUND_COLOR,
    },

    input: {
        alignItems:"center",
        width: '100%'
    }
})
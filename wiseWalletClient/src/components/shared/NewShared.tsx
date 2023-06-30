import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from "../../enums/Colors";

const NewShared: React.FC = () => {

    const [room, setRoom] = useState<string>("")
    const [participants, setParticipants] = useState<string>('')
    const [allParticipants, setAllParticipants] = useState<string[]>([])
    const [expense, setExpense] = useState<string>('')

    
    const onChangeRoom = (value: string) => {
        setRoom(value)
    }
    
    const onChangeParticipant = (value: string)=>{
        setParticipants(value)
        setAllParticipants([...allParticipants, participants])
    }

    const onChangeExpense = (value: string) => {
      setExpense(value)
    }

    
    return(
        <View style={styles.container}>
            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                Create your <Text style={{color: 'yellow'}}>Room</Text>
            </Text>
            <View style={styles.roomInput}>
            <TextInput
                value={room}
                onChangeText={value => onChangeRoom(value)}
                style={styles.input}
                placeholder="roomName..."
            />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={participants}
                    onChangeText={value => onChangeParticipant(value)}
                    style={styles.input}
                    placeholder="Add Participant..."
                />
              
                <TextInput
                    keyboardType="numeric"
                    value={expense}
                    onChangeText={value => onChangeExpense(value)}
                    style={styles.input}
                    placeholder="Monto"
                />
                
                <TouchableOpacity>
                    <Text style={styles.text}>
                        AGREGAR
                    </Text>
                </TouchableOpacity>
            
            </View>
        </View>
    )
};

export default NewShared;

const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.BACKGROUND_COLOR,
    },

    input: {
        alignItems:"center",
        width: "90%",
        backgroundColor: Colors.TITLE_COLOR,
        borderRadius: 15,
        color: 'black',
        margin: 10,
        
    },
    inputContainer: {
        width: "80%",
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius: 15,
        margin: 15,
        height: 200
    },

    text: {
        color: 'black',
        backgroundColor: "yellow",
        borderRadius: 15,
        width: 85,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
    },

    roomInput: {
        width: "80%",
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius: 15,
        margin: 15
    },
 
})
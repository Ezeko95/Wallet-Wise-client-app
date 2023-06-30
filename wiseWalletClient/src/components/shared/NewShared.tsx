import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors } from "../../enums/Colors";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { base_URL } from "../../redux/utils";
import { useAppSelector } from "../../redux/hooks/hooks";

const NewShared: React.FC = () => {
    const idUser = useAppSelector(state => state.user.user);
    const ide = idUser.map(idUser => idUser.payload.user.id);
    const navigation: any = useNavigation()
    const [room, setRoom] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [expense, setExpense] = useState<string>("")
    

    interface IParticipant {
        name: string,
        expense: number,        
    }

    //let allParticipant:IParticipant[] = [];
        
    const [participants, setParticipants]= useState<IParticipant[]>([])
    
    const onChangeRoom = (value: string) => {
        setRoom(value)
    }
    
    const handleParticipant = async () => {
        const participant = {
            name: name,
            expense: parseFloat(expense),
        }
        setParticipants([...participants, participant]);
        // setName("");
        // setExpense("");
    }
    console.log(participants)



    const handleSubmit=()=>{}
    
    const handlerSubmit = async () => {

        await axios.post(`${base_URL}/shared/${ide[ide.length -1]}`, participants)
    }

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', margin: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate('SharedList')}>
                    <Text style={styles.goBack}>{'<'}</Text>
                </TouchableOpacity>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', left: -15}}>
                        Create your 
                        <Text style={{color: 'yellow'}}>Room</Text>
                    </Text>
            </View>
            
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
                    value={name}
                    onChangeText={value => setName(value)}
                    style={styles.input}
                    placeholder="Add Participant..."
                />
                <TextInput
                    keyboardType="numeric"
                    value={expense}
                    onChangeText={value => setExpense(value)}
                    style={styles.input}
                    placeholder="Monto"
                />
                <TouchableOpacity onPress={()=> handleParticipant()}  >
                    <Text style={styles.text}>
                        AGREGAR
                    </Text>
                </TouchableOpacity>
            </View>
                {participants.length > 0 && <Text  style={{ fontSize: 15, color: 'white', fontWeight: 'bold'}} >Participants of {room}</Text>}
                
                {participants.length > 0 && participants.map((participant, index) => {
                  return( 
                    <View key={index} style={styles.detailParticipant}  >
                        <Text style={{color:"white", fontSize:10}} >{participant.name}</Text>
                        <Text>{participant.expense}</Text>
                    </View>)})
                } 
                {participants.length > 0  && 
                    <View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={styles.text} >Finish</Text>
                        </TouchableOpacity>
                    </View>}
        </View>
    )
};


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
        right: 50,
        top: -10
    },
    detailParticipant:{
        marginTop:10,
        alignItems:"center",
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius:10,
    }
 
})
        export default NewShared;
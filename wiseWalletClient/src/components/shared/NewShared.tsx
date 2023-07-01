import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Colors } from "../../enums/Colors";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { base_URL } from "../../redux/utils";
import { useAppSelector, useAppDispatch} from "../../redux/hooks/hooks";
import { getDetail, setDetail, setRoomId } from "../../redux/slices/sharedSlice";

const NewShared: React.FC = () => {
    const idUser = useAppSelector(state => state.user.user);
    const ide = idUser.map(idUser => idUser.payload.user.id);
    const navigation: any = useNavigation()
    const dispatch= useAppDispatch()
    const [room, setRoom] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [expense, setExpense] = useState<string>("")
    const [selfExpense, setSelfExpense] = useState<string>("")
    const [participants, setParticipants] = useState<IParticipant[]>([])
    const [personalExpense, setPersonalExpense] = useState<string>("")
    const [arrayRender, setArrayRender] = useState<IParticipant[]>([])
    const [editableInput, setEditableInput] = useState(true);

    interface IParticipant {
        name: string,
        expense: number,        
    }

    const onChangeRoom = (value: string) => {
        setRoom(value)
    }
    
    const handleParticipant = async () => {
        const participant = {
            name: name,
            expense: parseFloat(expense),
        }
        setParticipants([...participants, participant]);
        setArrayRender([...arrayRender,participant])
        setName("");
        setExpense("");
        console.log(participants)
    }

    const handleSelf = async () => {
        setPersonalExpense(selfExpense)
        setEditableInput(false) 
        setArrayRender([...arrayRender,  { "name": "Self Expense", "expense": parseFloat(selfExpense)}])
        setSelfExpense("")
    }


    
    const handlerSubmit = async () => {
        let cont=0;
        participants.forEach(e=> cont += e.expense)
        const info={
            name: room,
            total: (+cont) + (+personalExpense),
            personalExpense: personalExpense,
            participants
        }
        console.log(info, 'INFOOOOOOOOOO');
        
        const response= await axios.post(`${base_URL}/shared/${ide[ide.length -1]}`, info)
        setSelfExpense('')
        setRoom("")
        dispatch(setRoomId(response.data.id))
        dispatch(getDetail(response.data.id))
        navigation.navigate('SharedDetail')
    }

    return(
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', margin: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('SharedList')}>
                    <Text style={styles.goBack}>{'<'}</Text>
                </TouchableOpacity>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', left: -15}}>
                    Create your  
                    <Text style={{color: 'yellow'}}> Room</Text>
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

                <View style={styles.addSelfExpense}>
                    <TextInput
                    
                    
                    editable={editableInput}
                    style={styles.inputAddParticipant}
                    value={selfExpense}
                    onChangeText={value => setSelfExpense(value)}
                    placeholder="Add self expense..."
                    />
                    <TouchableOpacity onPress={()=>{ handleSelf()}}  style={styles.containerButtonAdd}  >
                        <Text style={styles.buttonAdd}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addParticipantContainer}>
                    <TextInput
                        value={name}
                        onChangeText={value => setName(value)}
                        style={styles.inputAddParticipant}
                        placeholder="Add Participant..."
                        />
                    <TextInput
                        keyboardType="numeric"
                        value={expense}
                        onChangeText={value => setExpense(value)}
                        style={styles.inputExpenseParticipant}
                        placeholder="Amount"
                        />
                </View>

                <View style={styles.containerButtons} >
                    <TouchableOpacity onPress={()=> handleParticipant()} disabled={!name || !expense} >
                        <Text style={styles.text}>
                        AGREGAR
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View  style={styles.containerAllDetails}>
                    {arrayRender.length > 0 && <Text  style={{ fontSize: 15, color: 'white', fontWeight: 'bold'}} >Participants of {room}</Text>}
                    {arrayRender.length > 0 &&  arrayRender.map((participant, index) => {
                        return( 
                            <View key={index} style={styles.detailParticipant}  >
                                <Text style={{ textAlign:"center", color:"white", fontSize:16, justifyContent: 'center', fontWeight: 'bold'}} >
                                    {participant.name} - {participant.expense}
                                </Text>
                            </View>
                        )})
                    } 
                </View>
            </ScrollView>
            {arrayRender.length > 1 && 
                <View>
                    <TouchableOpacity onPress={() => {handlerSubmit()}}>
                        <Text style={styles.textFinish} >Finish</Text>
                    </TouchableOpacity>
                </View>
            }
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
        margin: 15,
        
    },
    inputContainer: {
        width: "80%",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius: 15,
        margin: 15,
        height: 200,
        padding: 15
    },
    text: {
        color: 'black',
        backgroundColor: "yellow",
        borderRadius: 15,
        width: 85,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
        marginTop: 15
    },
    roomInput: {
        width: "80%",
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius: 15,
        marginTop: 10
    },
    goBack: {
        color: 'black',
        backgroundColor: "yellow",
        borderRadius: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        width: 40,
        height: 40,
        borderColor: '#FFF7AE',
        borderWidth: 2,
        right: 50,
    },
    detailParticipant:{
        marginTop:10,
        justifyContent:"center",
        alignItems:"center",
        height: 40,
        width: 300,
        backgroundColor: Colors.DETAIL_COLOR,
        borderRadius:15,
    },
    scrollDetail:{  
        flex:1,
        width:'100%',
        height: 300
    },
    containerButtons:{
        width:'100%',
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        margin:10,
    },

    addSelfExpense: {
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        
    },
    inputSelfExpense:{
        width: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 50,
        margin: 15
    },
    inputExpenseParticipant:{
        width: "30%",
        backgroundColor: 'white',
        borderRadius: 15,    
        margin: 15,

    },
    inputAddParticipant:{
        width: '60%',
        backgroundColor: 'white',
        borderRadius: 15,
        margin: 15,
    },
    addParticipantContainer: {
        flexDirection: 'row'
    },
    buttonAdd: {
        backgroundColor: 'yellow',
        fontWeight: 'bold',
        fontSize: 30,
        borderRadius: 15,
        width: '100%',
        textAlign:'center',
        color: 'black',
        height: "52%"
    },
    containerButtonAdd: {
        width:"30%",
        left: 15,
    },
    containerAllDetails:{
        
    },
    textFinish:{
        color: 'black',
        backgroundColor: "yellow",
        borderRadius: 15,
        width: 85,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
        marginBottom:15
    }

})
        export default NewShared;
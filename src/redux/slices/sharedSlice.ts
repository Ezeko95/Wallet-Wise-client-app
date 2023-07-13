import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { base_URL } from "../utils";
import { IExpenses } from "../interfaces/Interface";


export interface participants {
    id:number
    name: string,
    expense:number
}

export interface detailRoom {
    id:number
    participants: participants[]
    personalExpense: number
    total:number
    name: string
    deletedShared: boolean
}

export interface sharedState {
    allRooms: detailRoom[],
    loading: boolean,
    error: string | null, 
    roomId: number,
    detail: detailRoom
}

const initialState : sharedState = {
    allRooms : [],
    loading:false,
    error: null,
    roomId: 0, 
    detail:{
        id:0,
        participants:[],
        personalExpense:0,
        total:0,
        name:'',
        deletedShared: false
    }
}

const sharedSlice = createSlice ({
    name:"shared",
    initialState,
    reducers:{
        setShared: (state, action: PayloadAction<detailRoom[]>) =>{
            state.allRooms= action.payload
        },
        setDetail:(state, action: PayloadAction<detailRoom>)=> {
            state.detail= action.payload
        },
        setRoomId:(state, action: PayloadAction<number>)=>{
            state.roomId= action.payload
        },
        
        
    },

    
})

export const {setShared, setDetail, setRoomId} = sharedSlice.actions;

export const getDetail=(id: number): AppThunk=>{
    return async (dispatch)=>{
        const response= await axios.get(`${base_URL}/shared/${id}`);
        console.log(response.data, "este es el response")
        dispatch(setDetail( response.data));
    }
}

export const getAllRooms=(id: number): AppThunk=>{
    return async (dispatch)=>{
        const response= await axios.get(`${base_URL}/shared/all/${id}`)
        console.log(id, "ide del slice de shared")
        console.log(response.data, 'DATA SHAREDSILCE');
        
        dispatch(setShared(response.data))
    }
}

export default sharedSlice.reducer;





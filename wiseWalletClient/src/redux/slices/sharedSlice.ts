import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { base_URL } from "../utils";
import { IExpenses } from "../interfaces/Interface";


export interface participants {
    id:number
    name: string,
    gasto:number
}

export interface detailRoom {
    id:number
    participants: participants[]
    personalExpense: IExpenses
    total:number
}

export interface sharedState {
    allRooms: detailRoom[],
    loading: boolean,
    error: string | null, 
    roomId: number,
}

const initialState : sharedState = {
    allRooms : [],
    loading:false,
    error: null,
    roomId: 0,
}

const sharedSlice = createSlice ({
    name:"shared",
    initialState,
    reducers:{
        setShared: (state, action: PayloadAction<detailRoom>) =>{
            //state.allRooms= action.payload,
        },
        
    },

    
})

export const {setShared} = sharedSlice.actions;
export default sharedSlice.reducer;





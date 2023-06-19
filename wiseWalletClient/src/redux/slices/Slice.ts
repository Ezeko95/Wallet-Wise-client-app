import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../interfaces/Interface";
const initialState = {
    users: [],
    income: [],
    expends: []
}

const slice = createSlice({
    name: "wallet",
    initialState: initialState,
    reducers: {
        userPush: (state, action: PayloadAction<[]>)=>{
            state.users = action.payload;
        },
        incomePush:(state, action: PayloadAction<[]>)=>{
            state.income = action.payload;
        },
        expendsPush:(state, action: PayloadAction<[]>)=>{
            state.expends = action.payload;
        },
        postIncome: (state, action: PayloadAction<[]>)=>{
            state.income = action.payload;
        }
    }
})

export const { userPush, incomePush, expendsPush } = slice.actions;
export default slice.reducer;
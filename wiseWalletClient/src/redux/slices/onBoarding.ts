import { createSlice } from "@reduxjs/toolkit"


  
interface MyElement {
    id: number;
    image: number;
    name: string;
}

interface MyData {
    Onboarding: {
        grafico: MyElement[],
        change: MyElement[],
    },
    User: Number[]
}
const initialState:MyData = {  
    Onboarding: {grafico: [], change:[]},
    User: []
}

export const onBoardingSlice = createSlice({
    name: 'Onboarding',
    initialState,
    reducers: {
        getOnboarding:(state, action)=>{
            state.Onboarding = action.payload
        },
    }
})

export const { getOnboarding} =  onBoardingSlice.actions;
export default onBoardingSlice.reducer;
import { createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
import { base_URL } from "../utils";


export interface Detail {
  name: string,
  description: string,
  total: number,
  saved : number,
  picture: string,
  id: number,
  deletedGoal: boolean
}

export interface IGoalState{
    detail: Detail,
    goalId: number,
    allGoals: Detail[],
    loading: boolean,
    error: string | null
}

const initialState: IGoalState={
    detail: {
        name: '',
        description: '',
        total: 0,
        saved : 0,
        picture: '',
        id:0,
        deletedGoal: false
    },
    goalId: 0,
    allGoals:[],
    loading: false,
    error: null
}

const goalSlice= createSlice({
    name: 'goals',
    initialState,
    reducers: {
      setDetail: (state, action: PayloadAction<Detail>)=>{
        state.detail = action.payload;
      },
      clearDetail: (state) =>{
        state.detail = {
          name:"",
          description:"",
          total:0,
          saved:0,
          picture: '',
          id:0,
          deletedGoal: false
        }
      },
      goalError: (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      setGoalId: (state, action: PayloadAction<number>)=>{
        return{
            ...state,
            goalId: action.payload
        }
      },
      allGoals: (state, action: PayloadAction<Detail[]>)=>{
        return{
          ...state,
          allGoals: action.payload
        }
      }
    
    }
})

export const {setDetail, clearDetail, goalError, setGoalId, allGoals} = goalSlice.actions
export default goalSlice.reducer;

export const getDetail = (id : number): AppThunk=>{
    return async (dispatch)=>{
        try {
            const response= await axios.get(`${base_URL}/goal/${id}`);
            console.log(response.data, 'RESPONSE');
            return dispatch(setDetail(response.data))
        } catch (error) {
            return dispatch(goalError(error as Error))
        }
    }
}

export const getAllGoals= (id: number): AppThunk=>{
  return async (dispatch)=>{
    try {
      const response = await axios.get(`${base_URL}/goal/all/${id}`);
      return dispatch(allGoals(response.data))
      
    } catch (error) {
      return dispatch(goalError(error as Error))
    }

  }
}
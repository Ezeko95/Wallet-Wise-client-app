import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { base_URL } from '../utils';
import axios from 'axios'; 


export interface MovementData {
  type: string;
  account: string;
  amount: number;
}

interface MovementState {
  loading: boolean;
  error: string | null;
}

const initialState: MovementState = {
  loading: false,
  error: null,
};

const movementSlice = createSlice({
  name: 'movement',
  initialState,
  reducers: {
    postMovementStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    postMovementSuccess: (state) => {
      state.loading = false;
    },
    postMovementFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { postMovementStart, postMovementSuccess, postMovementFailure } = movementSlice.actions;

export const postMovement= (id: number, data: MovementData): AppThunk=>{
  return async (dispatch)=>{
    try {
      console.log(id)
      const response = await axios.post(`${base_URL}/movement/${id}`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      dispatch(postMovementFailure(error as Error))
    }
  }
} 
export default movementSlice.reducer;

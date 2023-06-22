import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
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
    postMovementFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postMovementStart, postMovementSuccess, postMovementFailure } = movementSlice.actions;

export const postMovement = (
    data: MovementData
  ): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${base_URL}/movement/1`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  };
export default movementSlice.reducer;
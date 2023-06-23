import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '../store';
import  AppThunk  from '../store';
import { AnyAction, Action } from '@reduxjs/toolkit';
import { base_URL } from '../utils';
import axios from 'axios'; 


export interface AccountData {
  
  name: string;
  total: number;
}

interface AccountState {
  loading: boolean;
  error: string | null;
}

const initialState: AccountState  = {
  loading: false,
  error: null,
};

const AccountSlice = createSlice({
  name: 'movement',
  initialState,
  reducers: {
    postAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    postAccountSuccess: (state) => {
      state.loading = false;
    },
    postAccountFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postAccountStart, postAccountSuccess, postAccountFailure } = AccountSlice.actions;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;


export const postAccount= (id: number, data: AccountData): AppThunk=>{
  return async (dispatch: AppDispatch)=>{
    try {
      console.log(id)
      const response = await axios.post(`${base_URL}/account/${id}`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log('error');
      
    }
  }
} 
export default AccountSlice.reducer;
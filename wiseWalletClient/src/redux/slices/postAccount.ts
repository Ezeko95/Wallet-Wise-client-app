import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
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

export const postAccount = (
    data: AccountData
  ): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${base_URL}/account/1`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  };
export default AccountSlice.reducer;
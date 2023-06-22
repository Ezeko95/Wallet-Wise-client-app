import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
import { base_URL } from '../utils';
import axios from 'axios'; 


export interface ExpenseData {
    amount : number,
    description: string,
    category: string,
    paymentMethod: string
}

interface ExpenseState {
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'movement',
  initialState,
  reducers: {
    postExpenseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    postExpenseSuccess: (state) => {
      state.loading = false;
    },
    postExpenseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {  postExpenseStart,   postExpenseSuccess,  postExpenseFailure } = expenseSlice.actions;

export const postExpense = (
    data: ExpenseData
  ): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${base_URL}/movement/1`, data);
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  };
export default expenseSlice.reducer;

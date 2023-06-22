import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { AllMovements, Account, Income, Expenses } from '../interfaces/Interface';
import axios from 'axios';
import { base_URL } from '../utils';
import { AppThunk } from '../store';


const initialState : AllMovements= {
    incomes: [],
    expenses: [],
    loading: false,
    error: null,
}

const getMovementsSlicer = createSlice ({
    name: "allmovements",
    initialState,
    reducers: {
        getAllMovementsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getIncomesSuccess: (state, action: PayloadAction<Income[]>) => {
            console.log('=========GET getIncomesSuccess==============');
            console.log("action", action);
            console.log(initialState.incomes)
            console.log('====================================');
            return {
                ...state,
                incomes: action.payload,
            }
        },
        getAllMovementsError: (state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        getExpensesSuccess: (state, action: PayloadAction<Expenses[]>) => {
            return {
                ...state,
                loading: false,
                error: null,
                expenses: action.payload
            }
        }

    }
})

export const { 
    getAllMovementsStart, 
    getIncomesSuccess, 
    getAllMovementsError,
    getExpensesSuccess } = getMovementsSlicer.actions;

export default getMovementsSlicer.reducer;

export const getIncome= (id: number): AppThunk=>{
    return async (dispatch)=>{
        try {
            const response = await axios(`${base_URL}/movement/incomes/${id}`)
            console.log('=========GET INCOME SLICE==============');
            console.log(response.data);
            console.log('====================================');
            const incomes: Income[] = []
            response.data?.forEach((account: Account) => {
                account.income.forEach((income: Income) => incomes.push(income))
            })
            console.log('=========el array de incomes==============');
            console.log(incomes);
            console.log('====================================');

            dispatch(getIncomesSuccess(incomes)) 
        } catch (error) {
            dispatch(getAllMovementsError(error as Error));
        }
    }
}

export const getExpense= (id: number): AppThunk=>{
    return async (dispatch)=>{
        try {
            const response= await axios(`${base_URL}/movement/expenses/${id}`)
            console.log('=========GET EXPENSE SLICE============');
            console.log(response.data);
            console.log('====================================');
            const expenses: Expenses[]= []
            response.data?.forEach((account: Account) => {
                account.expense.forEach((expense: Expenses ) => expenses.push(expense))
            });

            
            dispatch(getExpensesSuccess(expenses))
        } catch (error) {
            dispatch(getAllMovementsError(error as Error));
        }
    }
}
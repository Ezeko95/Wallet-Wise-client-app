import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import {
  AllMovements,
  Account,
  IIncome,
  IExpenses,
  Filtered,
} from '../interfaces/Interface';
import axios from 'axios';
import { base_URL } from '../utils';
import { AppThunk } from '../store';
import Expenses from '../../components/home/Expenses';

interface IAllMovements {
  allMovements: AllMovements[];
  incomes: IIncome[];
  expenses: IExpenses[];
  loading: boolean;
  error: string | null;
  accounts: string[];
  filtered: Filtered[];
  balance: number;
  itemId: number | null;
}

const initialState: IAllMovements = {
  allMovements: [],
  incomes: [],
  expenses: [],
  loading: false,
  error: null,
  accounts: [],
  filtered: [],
  balance: 0,
  itemId: 0,
};

const getMovementsSlicer = createSlice({
  name: 'allmovements',
  initialState,
  reducers: {
    getAllMovementsStart: state => {
      state.loading = true;
      state.error = null;
    },
    getIncomesSuccess: (state, action: PayloadAction<IIncome[]>) => {
      return {
        ...state,
        loading: false,
        error: null,
        incomes: action.payload,
      };
    },
    getAllMovementsError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    getExpensesSuccess: (state, action: PayloadAction<IExpenses[]>) => {
      return {
        ...state,
        loading: false,
        error: null,
        expenses: action.payload,
      };
    },
    getAccountSuccess: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        accounts: action.payload,
      };
    },
    chargeBalance: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        balance: action.payload,
      };
    },
    filterBalanceAccount: (state, action: PayloadAction<string>) => {
      if (action.payload === "All accounts"){
        return {
          ...state,
          filtered: [...state.allMovements]
        }
      } else {
        const account: any = state.allMovements.filter(
          (m: any) => m.account === action.payload,
        );
        const paymentMethod: any = state.allMovements.filter(
          (m: any) => m.paymentMethod === action.payload,
        )
        return {
          ...state,
          filtered: [...account, ...paymentMethod],
        }
      }
    },
    getMovementsSuccess: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        allMovements: action.payload,
        filtered: action.payload,
      };
    },
    setItemId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        itemId: action.payload,
      };
    },
    cleanItemId: state => {
      return {
        ...state,
        itemId: null,
      };
    },
    orderByAmount: (state, action: PayloadAction<string>) => {
      const results = (action.payload.toLowerCase() === 'asc') ?
            [...state.filtered].sort((a: any, b: any) => {
              if (a.amount > b.amount) { return 1 }
              if (a.amount< b.amount) {return -1}
              return 0;
            })
            : [...state.filtered].sort((a: any, b: any) => {
              if (a.amount> b.amount) {return -1}
              if (a.amount< b.amount) {return 1}
              return 0;
            });
      return {
        ...state,
        filtered: results,
      };
    },
    orderByAlpha: (state, action: PayloadAction<string>) => {
      const show: any[] = [...state.filtered].filter(e => e.deletedExpense === false || e.deletedIncome === false);
      const resultsArray = show.map(item => item.category || item.type);

      const results =
        action.payload === 'a' ? 
        resultsArray.sort((a: any, b: any) =>
              a.localeCompare(b),
          )
        : resultsArray.sort((a: any, b: any) =>
              b.localeCompare(a),
          );
          console.log("results en el alpha",results)
      const orderAlphaArray:any =[]
      for(let i = 0; i < results.length; i++){

        for(let movement of [...state.filtered]){
          if(results[i] === movement.type || results[i]  === movement.category){
            orderAlphaArray.push(movement)
            break;
          }
        }
      }
      return {
        ...state,
        filtered: orderAlphaArray,
      };
    },
    orderByDate: (state, action: PayloadAction<string>) => {
      const results = (action.payload.toLowerCase() === 'asc') ?
      [...state.filtered].sort((a: any, b: any) => {
        if (a.createdAt > b.createdAt) { return 1 }
        if (a.createdAt< b.createdAt) {return -1}
        return 0;
      })
      : [...state.filtered].sort((a: any, b: any) => {
        if (a.createdAt> b.createdAt) {return -1}
        if (a.createdAt< b.createdAt) {return 1}
        return 0;
      });
    return {
    ...state,
    filtered: results,
    };
    },
    },
  },
);

export const {
  getAllMovementsStart,
  getIncomesSuccess,
  getAllMovementsError,
  getExpensesSuccess,
  getAccountSuccess,
  filterBalanceAccount,
  getMovementsSuccess,
  chargeBalance,
  setItemId,
  cleanItemId,
  orderByAmount,
  orderByAlpha,
  orderByDate
} = getMovementsSlicer.actions;

export default getMovementsSlicer.reducer;

export const getIncome = (id: number): AppThunk => {
  return async dispatch => {
    try {
      const response = await axios(`${base_URL}/movement/incomes/${id}`);

      const incomes: IIncome[] = [];
      response.data?.forEach((account: Account) => {
        account.income.forEach((income: IIncome) => incomes.push(income));
      });

      dispatch(getIncomesSuccess(incomes));
    } catch (error) {
      dispatch(getAllMovementsError(error as Error));
    }
  };
};

export const getExpense = (id: number): AppThunk => {
  return async dispatch => {
    try {
      const response = await axios(`${base_URL}/movement/expenses/${id}`);

      const expenses: IExpenses[] = [];
      response.data?.forEach((account: Account) => {
        account.expense.forEach((expense: IExpenses) => expenses.push(expense));
      });

      dispatch(getExpensesSuccess(expenses));
    } catch (error) {
      dispatch(getAllMovementsError(error as Error));
    }
  };
};

export const getMovements = (id: number): AppThunk => {
  return async dispatch => {
    try {
      const dataExpense = await axios(`${base_URL}/movement/expenses/${id}`);
      const dataIncome = await axios(`${base_URL}/movement/incomes/${id}`);

      const allMovements: any[] = [];

      dataExpense.data?.forEach((account: Account) => {
        account.expense.forEach((expense: IExpenses) =>
          allMovements.push(expense),
        );
      });

      dataIncome.data?.forEach((account: Account) => {
        account.income.forEach((income: IIncome) => allMovements.push(income));
      });
      console.log("el allmovements", allMovements)
      dispatch(getMovementsSuccess(allMovements));
    } catch (error) {
      dispatch(getAllMovementsError(error as Error));
    }
  };
};

export const getAccounts = (id: number): AppThunk => {
  return async dispatch => {
    try {
      const response = await axios(`${base_URL}/balance/${id}`);
      const accounts: string[] = [];
      response.data?.Account.map((account: Account) => {
        accounts.push(account.name);
      });
      const total = response.data.total;
      console.log(accounts, 'slice get accounts');
      
      dispatch(chargeBalance(total));
      dispatch(getAccountSuccess(accounts));
    } catch (error) {
      dispatch(getAllMovementsError(error as Error));
    }
  };
};


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from '@reduxjs/toolkit';
import { base_URL } from '../utils';
import axios from 'axios'; 


export interface Users{
    name: string,
    email: string,
    pictures: string
}

interface UserState {
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
        loading: false,
        error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        userSucces: (state) => {
          state.loading = false;
        },
        usersFailure: (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        },
    }
})

export const { getUsers, userSucces, usersFailure } = usersSlice.actions;

export const gettingUsers = (): ThunkAction <void, RootState, unknown, AnyAction>=> async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${base_URL}/user/1`)
      console.log(response.data);
      return response.data
    } catch (error) {
      console.log(error);
    }
  };
export default usersSlice.reducer;
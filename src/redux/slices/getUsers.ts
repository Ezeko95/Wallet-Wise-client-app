import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode, {JwtPayload} from "jwt-decode";
import { AppThunk, RootState } from '../store';
import { getAccounts } from './allMovementsSlice';

export interface Users{
    payload:{
      user: {
        createdAt:string,
        email:string
        id: number
        name: string
        password: string
        picture:string
        premium: boolean
        updatedAt: string
      };
    }
}

interface UserState {
    user: Users[],
}

const initialState: UserState = {
    user:[],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      getUserTokken: (state, action)=>{
        state.user.push(action.payload)
      },
      getUri: (state,action)=>{
        state.user = action.payload
      }
  }
})



export const {getUserTokken,getUri } = usersSlice.actions;

export const gettingUsers = (): AppThunk => {
return async dispatch => {
  try {
    const accesTokken = await  AsyncStorage.getItem("accessToken");
    if (accesTokken) {
      const decodedToken = await jwtDecode(accesTokken);
      dispatch(getUserTokken({payload: decodedToken}))
      console.log("usuario registado REDUX", decodedToken)
      dispatch(getAccounts(decodedToken.user.user?.id))
    }
  } catch (error) {
    console.log(error);
  }
}
}
export default usersSlice.reducer;
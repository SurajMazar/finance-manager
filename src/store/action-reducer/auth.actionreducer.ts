import {createSlice} from '@reduxjs/toolkit';
import { getLocalStorage } from '../../utils/localstorage.utils';


interface authInterface{
  authenticated:boolean,
  token:string | undefined,
  user: | undefined,
  loading:boolean,
  error:any|undefined
}

const token = getLocalStorage('token');

const initialState:authInterface = {
  authenticated:token?true:false,
  token:token?token:undefined,
  user:undefined,
  loading:false,
  error:undefined
}


const AuthSlice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{

    loginRequest(state){
      state.loading = true;
    },

    loginSuccess(state,action){
      state.loading = false;
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },


    loginFail(state,action){
      state.loading = false;
      state.authenticated = false;
      state.token = undefined;
      state.user = undefined;
      state.error = action.payload;
    },

    clearAuthState(state){
        state.loading = false;
        state.authenticated = false;
        state.token = undefined;
        state.user = undefined;
        state.error = undefined;
    }

  }
});


export const {

  loginFail,
  loginRequest,
  loginSuccess,
  clearAuthState,
  
} = AuthSlice.actions

export default AuthSlice.reducer;
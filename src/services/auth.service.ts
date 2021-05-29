import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import {
  loginRequest,
  loginSuccess,
  loginFail,
  clearAuthState
} from '../store/action-reducer/auth.actionreducer';
import { httpbase } from '../utils/axios.utils';
import { setLocalstorage } from '../utils/localstorage.utils';
import { Toast } from '../utils/sweetalert.util';

export const Login = (formData:FormData,callback:()=>void) =>{
  return async(dispatch:Dispatch)=>{
    dispatch(loginRequest());
    try{
      const response = await httpbase().post('/auth/login',formData);
      const data = {
        token:response.data.data.token || undefined,
        user:response.data.data.user || undefined,
      }
      dispatch(loginSuccess(data));
      setLocalstorage('token', response.data.data.token);
      setLocalstorage('username', response.data.data.user.name);
      Toast('top','Login successful',true);
      callback();
      dispatch(push('/'));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(loginFail(e.response.data));
        Toast('top-center',e.response.data.data.error,false);
      }else{
        dispatch(loginFail("Something went wrong"));
        Toast('top',"Something went wrong",false);
      }
      dispatch(push('/login'));
    }
  }
}


export const logout = () =>{
  return async(dispatch:Dispatch)=>{
    dispatch(clearAuthState());
    localStorage.clear();
    push('/login');
    Toast('top',"You have been logged out!!",true);
  }
}
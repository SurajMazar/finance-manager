import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import {
  loginRequest,
  loginSuccess,
  loginFail
} from '../store/action-reducer/auth.actionreducer';
import { httpbase } from '../utils/axios.utils';
import { Toast } from '../utils/sweetalert.util';

export const Login = (formData:FormData) =>{
  return async(dispatch:Dispatch)=>{
    dispatch(loginRequest());
    try{
      const response = await httpbase().post('/auth/login',formData);
      const data = {
        token:response.data.data.token || undefined,
        user:response.data.data.user || undefined,
      }
      dispatch(loginSuccess(data));
      Toast('top-center','Login successful',true);
      dispatch(push('/'));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(loginFail(e.response.data));
        Toast('top-center',e.response.data.data.error,false);
      }else{
        dispatch(loginFail("Something went wrong"));
        Toast('top-center',"Something went wrong",false);
      }
      dispatch(push('/login'));
    }
  }
}
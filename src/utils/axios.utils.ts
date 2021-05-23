import axios from 'axios'
import { API } from '../config/app.config'
import { clearAuthState } from '../store/action-reducer/auth.actionreducer';
import store from '../store/store';
import { getLocalStorage } from './localstorage.utils';

export const httpbase = () =>{
  const token = getLocalStorage('token');
  const headers= {
    'Accept':'*/*',
    'Authorization':token?'Bearer '+token.toString():'',
    'access-control-allow-origin': '*'
  }
  let instance = axios.create({
    baseURL:API,
    headers:headers
  })

  instance.interceptors.response.use((response)=>{
    return response;
  },(error)=>{
    if(error.response.status === 401){
      const errorData = error.response.data.data;
      if(errorData){
        const {error} = errorData;
        if (error === "unauthenticated"){
          localStorage.clear();
          store.dispatch(clearAuthState());
        }
      }
    }
    return Promise.reject(error);
  });

  return instance;
}


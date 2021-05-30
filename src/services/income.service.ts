import {
  fetchIncomeFail,
  fetchIncomeRequest,fetchIncomeSuccess,

  createIncomeFail,
  createIncomeRequest,
  createIncomeSuccess
} from '../store/action-reducer/income.actionreducer';

import {Dispatch} from 'redux';
import { httpbase } from '../utils/axios.utils';
import { Toast } from '../utils/sweetalert.util';


export const fetchIncomes = (month:string|null=null) =>{
  return async (dispatch:Dispatch) => {
    dispatch(fetchIncomeRequest());
    try{
      const response  = await httpbase().get(`/income?${month?'month='+month:''}`);
      dispatch(fetchIncomeSuccess(response.data.data));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(fetchIncomeFail(e.response.data));
      }else{
        dispatch(fetchIncomeFail("Something went wrong"));
      }
    }
  }
}


export const createIncome = (formdata:FormData,callback:any = null) => {
  return async (dispatch:Dispatch) =>{
      dispatch(createIncomeRequest());
      try{
        const response = await  httpbase().post('/income/store',formdata);
        dispatch(createIncomeSuccess(response.data.data));
        if(callback)callback();
        Toast('top',"Income added successfully",true);
      }catch(e){
      if(e && e.response && e.response.data){
        dispatch(createIncomeFail(e.response.data));
      }else{
        dispatch(createIncomeFail("Something went wrong"));
      }
    }
  }
}
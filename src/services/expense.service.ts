import {
  createExpenseFail,
  createExpenseRequest,
  createExpenseSuccess,
  fetchExpenseFail,
  fetchExpenseRequest,
  fetchExpenseSuccess,
  updateExpenseFail,
  updateExpenseRequest,
  updateExpenseSuccess
} from '../store/action-reducer/expense.actionreducer';

import {Dispatch} from 'redux';
import { httpbase } from '../utils/axios.utils';
import { Toast } from '../utils/sweetalert.util';


export const fetchExpenses = (month:string|null=null) =>{
  return async (dispatch:Dispatch) => {
    dispatch(fetchExpenseRequest());
    try{
      const response  = await httpbase().get(`/expense?${month?'month='+month:''}`);
      dispatch(fetchExpenseSuccess(response.data.data));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(fetchExpenseFail(e.response.data));
      }else{
        dispatch(fetchExpenseFail("Something went wrong"));
      }
    }
  }
}


export const createExpense = (formdata:FormData,callback:any = null) => {
  return async (dispatch:Dispatch) =>{
      dispatch(createExpenseRequest());
      try{
        const response = await  httpbase().post('/expense/store',formdata);
        dispatch(createExpenseSuccess(response.data.data));
        if(callback)callback();
        Toast('top',"Transaction added successfully",true);
      }catch(e){
      if(e && e.response && e.response.data){
        dispatch(createExpenseFail(e.response.data));
      }else{
        dispatch(createExpenseFail("Something went wrong"));
      }
    }
  }
}


export const updateExpense = (formdata:FormData,id:number,callback:any = null) => {
  return async (dispatch:Dispatch) =>{
      dispatch(updateExpenseRequest());
      try{
        const response = await  httpbase().put('/expense/update/'+id,formdata);
        dispatch(updateExpenseSuccess(response.data.data));
        if(callback)callback();
        Toast('top',"Transaction updated successfully",true);
      }catch(e){
      if(e && e.response && e.response.data){
        dispatch(updateExpenseFail(e.response.data));
      }else{
        dispatch(updateExpenseFail("Something went wrong"));
      }
    }
  }
}
import {
  fetchIncomeFail,
  fetchIncomeRequest,fetchIncomeSuccess
} from '../store/action-reducer/income.actionreducer';

import {Dispatch} from 'redux';
import { httpbase } from '../utils/axios.utils';


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
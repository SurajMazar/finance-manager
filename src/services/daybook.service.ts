import {
  fetchIncomeFail,
  fetchIncomeRequest,
  fetchIncomeSuccess,
  addTotalIncome,
} from '../store/action-reducer/income.actionreducer';

import {
  addTotalExpense,
  fetchExpenseRequest,
  fetchExpenseFail,
  fetchExpenseSuccess
} from '../store/action-reducer/expense.actionreducer';

import {Dispatch} from 'redux';
import { httpbase } from '../utils/axios.utils';


export const fetchDaybookIncome = (date:string|null=null) =>{
  return async (dispatch:Dispatch) => {
    dispatch(fetchIncomeRequest());
    try{
      const response  = await httpbase().get(`/income/daybook?${date?'date='+date:''}`);
      dispatch(fetchIncomeSuccess(response.data.data.incomes));
      dispatch(addTotalIncome(response.data.data.total_income));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(fetchIncomeFail(e.response.data));
      }else{
        dispatch(fetchIncomeFail("Something went wrong"));
      }
    }
  }
}

export const fetchDaybookExpenses = (date:string|null=null) =>{
  return async (dispatch:Dispatch) => {
    dispatch(fetchExpenseRequest());
    try{
      const response  = await httpbase().get(`/expense/daybook?${date?'date='+date:''}`);
      dispatch(fetchExpenseSuccess(response.data.data.expenses));
      dispatch(addTotalExpense(response.data.data.total_expense));
    }catch(e){
      if(e && e.response && e.response.data){
        dispatch(fetchExpenseFail(e.response.data));
      }else{
        dispatch(fetchExpenseFail("Something went wrong"));
      }
    }
  }
}

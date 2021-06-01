import {createSlice} from '@reduxjs/toolkit';
import Expense from '../../models/expense.model';
import {udateIncomeExpenseArray} from '../../utils/common.utils';


interface stateInterface{
  expenses:Array<Expense> | undefined,
  loading:boolean,
  error:any,
  creating:boolean,
}

const initialState:stateInterface = {
  expenses:undefined,
  error:undefined,
  loading:false,
  creating:false
}




const ExpenseSlice = createSlice({
  name:'income',
  initialState:initialState,
  reducers:{

    fetchExpenseRequest(state){
      state.loading=true;
    },

    fetchExpenseSuccess(state,actions){
      state.loading = false;
      state.expenses = actions.payload;
    },

    fetchExpenseFail(state,actions){
      state.loading = false;
      state.error= actions.payload;
    },

    createExpenseRequest(state){
      state.creating=true;
    },

    createExpenseSuccess(state,actions){
      state.creating=false;
      state.expenses=[actions.payload].concat(state.expenses);
    },

    createExpenseFail(state,actions){
      state.creating=false;
      state.error= actions.payload
    },


    updateExpenseRequest(state){
      state.creating=true;
    },

    updateExpenseSuccess(state,actions){
      state.creating=false;
      state.expenses=udateIncomeExpenseArray(state.expenses,actions.payload);
    },

    updateExpenseFail(state,actions){
      state.creating=false;
      state.error= actions.payload
    },

  }
});


export const {
  fetchExpenseFail,
  fetchExpenseRequest,
  fetchExpenseSuccess,

  createExpenseFail,
  createExpenseRequest,
  createExpenseSuccess,

  updateExpenseFail,
  updateExpenseRequest,
  updateExpenseSuccess
  
} = ExpenseSlice.actions;



export default ExpenseSlice.reducer;


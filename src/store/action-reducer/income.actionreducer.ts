import {createSlice} from '@reduxjs/toolkit';
import Income from '../../models/income.model';
import {udateIncomeExpenseArray} from '../../utils/common.utils';


interface stateInterface{
  incomes:Array<Income> | undefined,
  loading:boolean,
  error:any,
  creating:boolean,
  total_income:number|undefined
}

const initialState:stateInterface = {
  incomes:undefined,
  error:undefined,
  loading:false,
  creating:false,
  total_income:undefined
}




const IncomeSlice = createSlice({
  name:'income',
  initialState:initialState,
  reducers:{

    fetchIncomeRequest(state){
      state.loading=true;
    },

    fetchIncomeSuccess(state,actions){
      state.loading = false;
      state.incomes = actions.payload;
    },

    addTotalIncome(state,actions){
      state.total_income = actions.payload;
    },

    fetchIncomeFail(state,actions){
      state.loading = false;
      state.error= actions.payload;
    },

    createIncomeRequest(state){
      state.creating=true;
    },

    createIncomeSuccess(state,actions){
      state.creating=false;
      state.incomes=[actions.payload].concat(state.incomes);
    },

    createIncomeFail(state,actions){
      state.creating=false;
      state.error= actions.payload
    },


    updateIncomeRequest(state){
      state.creating=true;
    },

    updateIncomeSuccess(state,actions){
      state.creating=false;
      state.incomes=udateIncomeExpenseArray(state.incomes,actions.payload);
    },

    updateIncomeFail(state,actions){
      state.creating=false;
      state.error= actions.payload
    },

  }
});


export const {
  fetchIncomeFail,
  fetchIncomeRequest,
  addTotalIncome,
  fetchIncomeSuccess,

  createIncomeFail,
  createIncomeRequest,
  createIncomeSuccess,

  updateIncomeFail,
  updateIncomeRequest,
  updateIncomeSuccess
  
} = IncomeSlice.actions;



export default IncomeSlice.reducer;
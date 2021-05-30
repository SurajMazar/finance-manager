import {createSlice} from '@reduxjs/toolkit';
import Income from '../../models/income.model';

interface stateInterface{
  incomes:Array<Income> | undefined,
  loading:boolean,
  error:any,
  creating:boolean,
}

const initialState:stateInterface = {
  incomes:undefined,
  error:undefined,
  loading:false,
  creating:false
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

  }
});


export const {
  fetchIncomeFail,
  fetchIncomeRequest,
  fetchIncomeSuccess,

  createIncomeFail,
  createIncomeRequest,
  createIncomeSuccess
  
} = IncomeSlice.actions;



export default IncomeSlice.reducer;
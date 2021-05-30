import {createSlice} from '@reduxjs/toolkit';
import Income from '../../models/income.model';

interface stateInterface{
  incomes:Array<Income> | undefined,
  loading:boolean,
  error:any
}

const initialState:stateInterface = {
  incomes:undefined,
  error:undefined,
  loading:false,
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

  }
});


export const {
  fetchIncomeFail,
  fetchIncomeRequest,
  fetchIncomeSuccess
} = IncomeSlice.actions;



export default IncomeSlice.reducer;

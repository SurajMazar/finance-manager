import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ExpenseDaybook from './expense';
import DayBookIncome from './income';
import { useDispatch, useSelector } from 'react-redux';
import Income from '../../models/income.model';
import { fetchDaybookExpenses, fetchDaybookIncome } from '../../services/daybook.service';
import moment from 'moment';
import CreateEditIncome from '../income/create-edit';
import Expense from '../../models/expense.model';
import { fetchCategory } from '../../services/category.service';
import Category from '../../models/category.model';
import CreateEditExpense from '../expenses/create-edit';
import { getTotal, NepaliNS } from '../../utils/common.utils';


interface state{
  income:{
    loading:boolean,
    incomes:Array<Income>,
    total_income:number,
    creating:boolean,
  },
  expense:{
    loading:boolean,
    expenses:Array<Income>,
    total_expense:number,
    creating:boolean,
  },
  category:{
    categories:Array<Category>
  }
}

const Daybook:React.FC = () =>{


    // redux store
    const dispatch = useDispatch();


    const state = useSelector((state:state)=>{
      return state;
    })
    const {income,expense,category} = state;
  
  
    const loadIncome = (date:Date|null)=>{
      dispatch(fetchDaybookIncome(moment(date).format('yyyy-MM-DD')));
    }
  
    const loadExpense = (date:Date|null)=>{
      dispatch(fetchDaybookExpenses(moment(date).format('yyyy-MM-DD')));
    }

    // end redux store

  const [date, changeDate] = useState<Date|null>(new Date());

  const onDateChange = (date: Date | null) =>{
    changeDate(date);
    loadIncome(date);
    loadExpense(date);
  }



  useEffect(()=>{
    loadIncome(date);
    loadExpense(date);
    dispatch(fetchCategory());
  },[])// eslint-disable-line


  /** 
   * creating editing
  **/
  // modal for create edit income expenses
  // income 
  const [showExpModal,setShowExpModel] = useState(false);
  /** close modal */
  const closeExpModel =()=>{
    setShowExpModel(false);
  }

   // used for editing
   const [editExp,setEditExp] = useState<Expense|undefined>(undefined);
   const openeditModelExp = (exp:Expense) =>{
      setEditExp(exp);
      setShowExpModel(true);
  }
  /** open create model **/
  const openExpModel =()=>{
    setEditExp(undefined);
    setShowExpModel(true);
  }

  //expenses
  const [showIncModal,setShowIncModel] = useState(false);
  /** close modal */
  const closeIncModel =()=>{
    setShowIncModel(false);
  }

   // used for editing
   const [editInc,setEditInc] = useState<Income|undefined>(undefined);
   const openeditModelInc= (inc:Income) =>{
    setEditInc(inc);
    setShowIncModel(true);
  }
  /** open create model **/
  const openIncModel =()=>{
    setEditInc(undefined);
    setShowIncModel(true);
  }
  // modal for create edit income expenses
   /** 
   * creating editing
  **/
  return(
    <>
    <h4 className="text-center text-22-primary mb-2">Daybook</h4>
    <Grid container spacing={4} >
      {/* //calender */}
      <Grid item xs={12}  className="display-flex justify-content-center">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            value={date}
            onChange={onDateChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      {/* {daybook by date} */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className="text-right">
              <Button className="btn-primary" onClick={openIncModel}>
              ADD INCOME
              </Button>
            </div>
          
            <DayBookIncome 
             editModel={openeditModelInc} 
             incomes={income.incomes}
             total_expense={expense.total_expense}
             total_income={income.total_income}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="text-right">
              <Button className="btn-primary" onClick={openExpModel}>
                ADD EXPENSE
              </Button>
            </div>
            <ExpenseDaybook 
              editModel={openeditModelExp} 
              expenses={expense.expenses}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <div className="text-center">
      <button className="btn-primary text-center m-2 text-18">
        <span className="mr-1">Cash in hand</span>
        {NepaliNS((income.total_income-expense.total_expense)-getTotal(expense.expenses || [])+getTotal(income.incomes || []))}
      </button>
    </div>
    
    <CreateEditIncome 
    loading={income.creating} 
    edit={editInc} 
    created_at={date} 
    visible={showIncModal} 
    closeModel={closeIncModel}
    categories={category.categories}
    />
    <CreateEditExpense
      loading={expense.creating} 
      edit={editExp} 
      created_at={date} 
      visible={showExpModal} 
      closeModel={closeExpModel}
      categories={category.categories}
      max={(income.total_income-expense.total_expense)-getTotal(expense.expenses || [])+getTotal(income.incomes || [])}
    />
    </>
  );
}


export default Daybook;
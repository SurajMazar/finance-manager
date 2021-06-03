import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { getMonthYear, getTotal, NepaliNS } from "../../utils/common.utils";
import { DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {Grid} from '@material-ui/core';
import {FiEdit, FiPlus} from 'react-icons/fi';
import CreateEdit from './create-edit'; 
import Category from "../../models/category.model";
import { fetchCategory } from "../../services/category.service";
import Expense from "../../models/expense.model";
import { fetchExpenses } from "../../services/expense.service";
import { fetchDaybookExpenses, fetchDaybookIncome } from "../../services/daybook.service";
interface state{
  expense:{
    expenses:Array<Expense>,
    loading:boolean,
    creating:boolean,
  },
  category:{
    categories:Array<Category>
  }
}

const ExpensePage:React.FC = () =>{

  

  // global state
  const dispatch = useDispatch(); // redux hooks
  useEffect(()=>{
    dispatch(fetchDaybookExpenses());
    dispatch(fetchDaybookIncome());
    dispatch(fetchExpenses());
    dispatch(fetchCategory());
  },[dispatch]);

  const state = useSelector((state:state)=>{
    const {expense,category} = state;
    return {...expense,...category};
  });

  const {expenses,loading,creating,categories} = state;
  // end global state 


  //income by month
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const handleDateChange = (date: Date | null) => {
    console.log(date)
    setSelectedDate(date);
    dispatch(fetchExpenses(moment(date).format('YYYY-MM')));
  };

  //edit show modal related
  
  const [showModal,setShowModel] = useState(false);



  /** close modal */
  const closeModel =()=>{
    setShowModel(false);
  }

   // used for editing
   const [editIncome,setEditCat] = useState<Expense|undefined>(undefined);
   const openeditModel = (exp:Expense) =>{
     setEditCat(exp);
     setShowModel(true);
  }

     /** open create model **/
  const openModel =()=>{
    setEditCat(undefined);
    setShowModel(true);
  }


  return(
    <section className="main-content">
      <h4 className="text-22 text-center">Expenses</h4>

      <button className="floating-btn" onClick={openModel}>
       <FiPlus/>
       <div className="floating-btn-text">
         Add Expense
       </div>
      </button>

      <div className="section-break-2 fm-form"> 
        <Grid item xs={12} md={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Income by month"
              helperText="Start from year selection"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider >
        </Grid>
      </div>

      <div className="section-break-1">
        <h4 className="text-16 text-center">For Month of 
          <span className="text-primary ml-05">
          {selectedDate?getMonthYear(selectedDate):getMonthYear()}
          </span>
        </h4>
      </div>

      <div className="transaction-list">

        <div className="transaction-header">
          <div className="transaction-header-date">Date</div>
          <div className="transaction-header-title">Particulars</div>
          <div className="transaction-header-amount">Amount</div>
          <div className="transaction-header-actions">Actions</div>
        </div>
        {
          loading?"":
          expenses && expenses.length?
          <>
            {expenses.map((exp)=>(
              <div className="transaction-item" key={exp.id}>
                <div className="transaction-item-date">{moment(exp.createdAt).format('Do MMMM YYYY')}</div>
                <div className="transaction-item-title">{exp.title}</div>
                <div className="transaction-item-amount">{NepaliNS(exp.amount)}</div>
                <div className="transaction-item-actions">
                  <div onClick={()=>openeditModel(exp)} title="Edit"><FiEdit className="btn-pm-round"/></div>
                </div>
              </div>
            ))}
            {/* // calculate total */}
            <div className="transaction-item">
              <div className="transaction-item-date">
                <span className="text-primary ml-1 fw-medium">
                {selectedDate?getMonthYear(selectedDate):getMonthYear()}
                </span>
              </div>
              <div className="transaction-item-title text-primary fw-medium">Total</div>
              <div className="transaction-item-amount text-primary fw-medium">
                {NepaliNS(getTotal(expenses))}
              </div>
              <div className="transaction-item-actions ">
              </div>
            </div>
          </>:
          // notransactions
          <div className="transaction-item p-1 justify-content-center" style={{border:'1px solid #dddada'}}>Sorry no transactions found for 
            <span className="text-primary ml-1">
            {selectedDate?getMonthYear(selectedDate):getMonthYear()}
            </span>
          </div>
        }

      </div>

      <CreateEdit closeModel={closeModel} visible={showModal} loading={creating} edit={editIncome} categories={categories}/>
    </section>
  );
}


export default ExpensePage;
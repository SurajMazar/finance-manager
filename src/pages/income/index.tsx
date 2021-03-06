import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomeModel from "../../models/income.model";
import { fetchIncomes } from "../../services/income.service";
import moment from 'moment';
import { getMonthYear, getTotal, NepaliNS } from "../../utils/common.utils";
import { DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {Grid} from '@material-ui/core';
import {FiEdit, FiPlus} from 'react-icons/fi';
import CreateEdit from './create-edit'; 
import Category from "../../models/category.model";
import { fetchCategory } from "../../services/category.service";
import Income from "../../models/income.model";
interface state{
  income:{
    incomes:Array<IncomeModel>,
    loading:boolean,
    creating:boolean
  },
  category:{
    categories:Array<Category>
  }
}

const IncomePage:React.FC = () =>{

  

  // global state
  const dispatch = useDispatch(); // redux hooks
  useEffect(()=>{
    dispatch(fetchIncomes());
    dispatch(fetchCategory());
  },[dispatch]);

  const state = useSelector((state:state)=>{
    const {income,category} = state;
    return {...income,...category};
  });

  const {incomes,loading,creating,categories} = state;
  // end global state 


  //income by month
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const handleDateChange = (date: Date | null) => {
    console.log(date)
    setSelectedDate(date);
    dispatch(fetchIncomes(moment(date).format('YYYY-MM')));
  };

  //edit show modal related
  
  const [showModal,setShowModel] = useState(false);

  

  /** close modal */
  const closeModel =()=>{
    setShowModel(false);
  }

   // used for editing
   const [editIncome,setEditCat] = useState<Income|undefined>(undefined);
   const openeditModel = (inc:Income) =>{
     setEditCat(inc);
     setShowModel(true);
  }

   /** open create model **/
  const openModel =()=>{
    setEditCat(undefined);
    setShowModel(true);
  }


  return(
    <section className="main-content">
      <h4 className="text-22 text-center">Incomes</h4>

      <button className="floating-btn" onClick={openModel}>
       <FiPlus/>
       <div className="floating-btn-text">
         Add income
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
          incomes && incomes.length?
          <>
            {incomes.map((inc)=>(
              <div className="transaction-item" key={inc.id}>
                <div className="transaction-item-date">{moment(inc.createdAt).format('Do MMMM YYYY')}</div>
                <div className="transaction-item-title">{inc.title}</div>
                <div className="transaction-item-amount">{NepaliNS(inc.amount)}</div>
                <div className="transaction-item-actions">
                  <div onClick={()=>openeditModel(inc)} title="Edit"><FiEdit className="btn-pm-round"/></div>
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
                {NepaliNS(getTotal(incomes))}
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


export default IncomePage;
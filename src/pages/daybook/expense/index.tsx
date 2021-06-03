import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Expense from '../../../models/expense.model';
import { getTotal, NepaliNS } from '../../../utils/common.utils';

interface ExpProps{
  expenses:Array<Expense>,
  editModel:(e:Expense)=>void,
 
}

const DayBookExpenses:React.FC<ExpProps> = (props) =>{

  const {editModel,expenses} = props;

  return(
    <>
    <h3 className="text-center text-18">Expenses</h3>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Sn</th>
            <th>Particulars</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.length?
          expenses.map((exp,i)=>(
            <tr key={i}>
              <td>{i+1}</td>
              <td>{exp.title}</td>
              <td>{NepaliNS(exp.amount)}</td>
              <td>
                <div onClick={()=>editModel(exp)} title="Edit"><FiEdit className="btn-pm-round"/></div>
              </td>
            </tr>
          )):
            <tr>
              <td colSpan={4} className="text-center">No transactions found!</td>
            </tr>
          }
        </tbody>
        <tfoot>
        <tr>
            <td></td>
            <td>Total</td>
            <td>{NepaliNS(getTotal(expenses||[]))}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
    </>
  );
}

export default DayBookExpenses;
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Income from '../../../models/income.model';
import { getTotal, NepaliNS } from '../../../utils/common.utils';

interface ExpProps{
  incomes:Array<Income>,
  editModel:(e:Income)=>void,
  total_income:number,
  total_expense:number
}

const DayBookExpenses:React.FC<ExpProps> = (props) =>{

  const {editModel,incomes,total_expense,total_income} = props;

  const opening = total_income-total_expense;

  return(
    <>
    <h3 className="text-center text-18">Income</h3>
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
          <tr>
            <td>1</td>
            <td>Opening Balance</td>
            <td>{NepaliNS(opening)}</td>
          </tr>
          {incomes && incomes.length?
          incomes.map((inc,i)=>(
            <tr key={i}>
              <td>{i+2}</td>
              <td>{inc.title}</td>
              <td>{NepaliNS(inc.amount)}</td>
              <td>
                <div onClick={()=>editModel(inc)} title="Edit"><FiEdit className="btn-pm-round"/></div>
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
            <td>{NepaliNS(opening+getTotal(incomes||[]))}</td>
            <td></td>
          </tr>
         
        </tfoot>
      </table>
    </div>
    </>
  );
}

export default DayBookExpenses;
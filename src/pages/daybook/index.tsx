import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const Daybook:React.FC = () =>{

  const [date, changeDate] = useState<Date|null>(new Date());

  const onDateChange = (date: Date | null) =>{
    changeDate(date)
  }

  return(
    <>
    <h4 className="text-center text-22-primary mb-2">Daybook</h4>
    <Grid container spacing={2} >
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

      </Grid>
    </Grid>
    </>
  );
}


export default Daybook;
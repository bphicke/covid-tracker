import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Card, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2020-01-22T21:11:54"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // const handleDateChange = (date: Date) => {
  //   setStartDate(new Date(date));
  // };

  return (
    <Card>
      <Grid container justify="space-around">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            margin="normal"
            id="start-date"
            label="Start Date"
            format="MM/dd/yyyy"
            value={startDate}
            onChange={setStartDate}
          />
          <KeyboardDatePicker
            disableToolbar
            margin="normal"
            id="end-date"
            label="End Date"
            format="MM/dd/yyyy"
            value={endDate}
            onChange={setEndDate}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Card>
  );
};

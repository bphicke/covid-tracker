import React, { Dispatch, SetStateAction } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Card, Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

type Props = {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
};

export const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
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
  );
};

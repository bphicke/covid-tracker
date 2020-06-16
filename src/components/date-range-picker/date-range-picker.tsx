import React, { Dispatch, SetStateAction } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
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
  const handlesetDate = (setDate: Dispatch<SetStateAction<Date | null>>) => (
    date: Date | null,
  ) => {
    date!.setHours(0, 0, 0, 0);
    setDate(date);
  };

  return (
    <Grid container justify="space-around" data-testid="dateRangePicker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          margin="normal"
          id="start-date"
          label="Start Date"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={handlesetDate(setStartDate)}
        />
        <KeyboardDatePicker
          disableToolbar
          margin="normal"
          id="end-date"
          label="End Date"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={handlesetDate(setEndDate)}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

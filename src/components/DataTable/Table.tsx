import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { SeriesLineOptions } from "highcharts";

type Props = {
  dates: string[];
  rowsData: SeriesLineOptions[];
};

export const DataTable = ({ dates, rowsData }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            {dates.map((date) => {
              return (
                <TableCell key={date}>
                  <Typography variant="body2" noWrap>
                    {date}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
          {rowsData.map((rowData) => {
            return (
              <TableRow>
                <TableCell
                  style={{ color: (rowData.color as string) || "black" }}
                >
                  {rowData.name}
                </TableCell>
                {rowData.data?.map((confirmed) => {
                  return (
                    <TableCell
                      align="right"
                      style={{ color: (rowData.color as string) || "black" }}
                    >
                      {confirmed}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
      </Table>
    </TableContainer>
  );
};

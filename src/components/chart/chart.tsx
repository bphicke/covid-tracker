import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DataByCountry, CountriesInputs } from "../shared/types";
import { DataTable } from "../data-table/data-table";
import { buildOptions } from "./helpers";

type Props = {
  dataByCountry: DataByCountry;
  countriesInputs: CountriesInputs;
  startDate: Date | null;
  endDate: Date | null;
};

export const Chart = ({
  dataByCountry,
  countriesInputs,
  startDate,
  endDate,
}: Props) => {
  const options = buildOptions(
    dataByCountry,
    countriesInputs,
    startDate,
    endDate,
  );

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <DataTable dates={options.xAxis.categories} rowsData={options.series} />
    </>
  );
};

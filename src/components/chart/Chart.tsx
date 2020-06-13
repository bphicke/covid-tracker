import React from "react";
import Highcharts, { Options, SeriesLineOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DataByCountry, SelectedCountries } from "../../App";

const buildSeries = (
  dataByCountry: DataByCountry,
  selectedCountries: SelectedCountries,
): SeriesLineOptions[] => {
  return Object.entries(dataByCountry)
    .filter(([country]) => {
      return selectedCountries[country];
    })
    .map(([country, entries]) => {
      return {
        name: country,
        data: entries.map((entry) => entry.confirmed),
        type: "line",
      };
    });
};

const buildOptions = (
  dataByCountry: DataByCountry,
  selectedCountries: SelectedCountries,
): Options => {
  return {
    title: {
      text: "Confirmed Covid-19 Cases",
    },
    xAxis: {
      //TODO: put this in a function
      categories: dataByCountry?.US?.map((entry) => entry.date),
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Confirmed Cases",
      },
    },
    series: buildSeries(dataByCountry, selectedCountries),
    credits: { enabled: false },
  };
};

export type Entry = {
  date: Date;
  confirmed: number;
};

type Props = {
  loading: boolean;
  error: boolean;
  dataByCountry: DataByCountry;
  selectedCountries: SelectedCountries;
};

export const Chart = ({
  loading,
  error,
  dataByCountry,
  selectedCountries,
}: Props) => {
  console.log("state", dataByCountry);

  if (loading) return null;
  if (error) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={buildOptions(dataByCountry, selectedCountries)}
    />
  );
};

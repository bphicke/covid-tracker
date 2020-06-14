import React from "react";
import Highcharts, { Options, SeriesLineOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { DataByCountry, CountriesInputs } from "../shared/types";

const buildSeries = (
  dataByCountry: DataByCountry,
  countriesInputs: CountriesInputs,
): SeriesLineOptions[] => {
  return Object.entries(dataByCountry)
    .filter(([country]) => {
      return countriesInputs[country]?.selected;
    })
    .map(([country, entries]) => {
      return {
        name: country,
        data: entries.map((entry) => entry.confirmed),
        type: "line",
        color: countriesInputs[country]?.color?.hex,
      };
    });
};

const buildOptions = (
  dataByCountry: DataByCountry,
  countriesInputs: CountriesInputs,
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
    series: buildSeries(dataByCountry, countriesInputs),
    credits: { enabled: false },
  };
};

type Props = {
  loading: boolean;
  error: boolean;
  dataByCountry: DataByCountry;
  countriesInputs: CountriesInputs;
};

export const Chart = ({
  loading,
  error,
  dataByCountry,
  countriesInputs,
}: Props) => {
  console.log("state", dataByCountry);

  if (loading) return null;
  if (error) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={buildOptions(dataByCountry, countriesInputs)}
    />
  );
};

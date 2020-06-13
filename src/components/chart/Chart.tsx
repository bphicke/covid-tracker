import React, { useContext } from "react";
import Highcharts, { Options, SeriesLineOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { store } from "../store/store";
import { ResponseData } from "../fetch/Fetch";

const buildSeries = (dataByCountry: ResponseData): SeriesLineOptions[] => {
  return Object.entries(dataByCountry).map(([country, entries]) => {
    return {
      name: country,
      data: entries.map((entry) => entry.confirmed),
      type: "line",
    };
  });
};

const buildOptions = (dataByCountry: ResponseData): Options => {
  return {
    title: {
      text: "Confirmed Covid-19 Cases",
    },
    xAxis: {
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
    series: buildSeries(dataByCountry),
    credits: { enabled: false },
  };
};

export const Chart = () => {
  const {
    state: { dataByCountry, loading, error },
  } = useContext(store);
  console.log("state", dataByCountry);

  if (loading) return null;
  if (error) return null;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={buildOptions(dataByCountry)}
    />
  );
};

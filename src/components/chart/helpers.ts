import { DataByCountry, CountriesInputs } from "../shared/types";
import { SeriesLineOptions } from "highcharts";

const buildSeries = (
  dataByCountry: DataByCountry,
  countriesInputs: CountriesInputs,
  startDate: Date | null,
  endDate: Date | null,
): SeriesLineOptions[] => {
  return Object.entries(dataByCountry)
    .filter(([country]) => {
      return countriesInputs[country]?.selected;
    })
    .map(([country, entries]) => {
      let filteredData = entries
        .filter((entry) => {
          return Date.parse(entry.date) >= startDate!.getTime();
        })
        .filter((entry) => {
          return Date.parse(entry.date) <= endDate!.getTime();
        })
        .map((entry) => entry.confirmed);
      return {
        name: country,
        data: filteredData,
        type: "line",
        color: countriesInputs[country]?.color?.hex,
      };
    });
};

const buildCategories = (
  dataByCountry: DataByCountry,
  startDate: Date | null,
  endDate: Date | null,
) => {
  return dataByCountry?.US?.map((entry) => entry.date)
    .filter((date) => {
      return Date.parse(date) >= startDate!.getTime();
    })
    .filter((date) => {
      return Date.parse(date) <= endDate!.getTime();
    });
};

export const buildOptions = (
  dataByCountry: DataByCountry,
  countriesInputs: CountriesInputs,
  startDate: Date | null,
  endDate: Date | null,
) => {
  return {
    title: {
      text: "Confirmed Covid-19 Cases",
    },
    xAxis: {
      categories: buildCategories(dataByCountry, startDate, endDate),
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Confirmed Cases",
      },
    },
    series: buildSeries(dataByCountry, countriesInputs, startDate, endDate),
    credits: { enabled: false },
  };
};

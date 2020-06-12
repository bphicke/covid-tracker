import React, { useContext, useEffect, useState } from "react";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { store } from "../store/store";

const options: Options = {
  title: {
    text: "Confirmed Covid-19 Cases",
  },
  series: [
    {
      type: "line",
      data: [
        { x: 1, y: 9, name: "Point 1" },
        { x: 2, y: 10, name: "Point 2" },
        { x: 3, y: 15, name: "Point 3" },
      ],
    },
    {
      type: "line",
      data: [2, 3, 4],
    },
  ],
  // xAxis: {
  //   title: {
  //     text: 'Date',
  //   }
  // }
};

export const Chart = () => {
  const {
    state: { data, loading, error },
  } = useContext(store);
  const [chartOptions, setChartOptions] = useState<Options>(options);
  console.log("state", data);

  useEffect(() => {
    console.log(Object.keys(data));
    const nextSeries = Object.entries(data).map(([country, entries], index) => {
      return {
        name: country,
        type: "line",
        data: entries.map((entry, index) => {
          return {
            x: index,
            y: entry.confirmed,
            name: entry.date,
          };
        }),
        // xAxis: {
        //   title: {
        //     text: "Date",
        //   },
        // },
        // yAxis: {
        //   title: {
        //     text: "Confirmed Cases",
        //   },
        // },
      };
    });
    setChartOptions({
      // @ts-ignore
      series: nextSeries,
    });
  }, [data, loading]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

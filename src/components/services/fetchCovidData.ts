import { Dispatch, SetStateAction } from "react";
import { DataByCountry } from "../shared/types";
import axios from "axios";

export const fetchData = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
  setDataByCountry: Dispatch<SetStateAction<DataByCountry>>,
) => {
  try {
    const timeSeriesData = await axios(
      "https://pomber.github.io/covid19/timeseries.json",
    );
    setDataByCountry({
      ...timeSeriesData.data,
    });
    console.log(timeSeriesData);
    setLoading(false);
  } catch {
    setError(true);
  }
};

import { Dispatch, SetStateAction } from "react";
import { DataByCountry } from "../shared/types";
import axios from "axios";

export const fetchData = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>,
  setDataByCountry: Dispatch<SetStateAction<DataByCountry>>,
) => {
  try {
    const cache = localStorage.getItem("cache");
    let cacheJson;
    if (cache) {
      cacheJson = JSON.parse(cache);
    }
    if (cacheJson && Date.parse(cacheJson.expires) > new Date().getTime()) {
      setDataByCountry({
        ...cacheJson.data,
      });
    } else {
      const timeSeriesData = await axios.get(
        "https://pomber.github.io/covid19/timeseries.json",
      );
      localStorage.setItem(
        "cache",
        JSON.stringify({
          expires: timeSeriesData.headers.expires,
          data: { ...timeSeriesData.data },
        }),
      );
      setDataByCountry({
        ...timeSeriesData.data,
      });
    }
    setLoading(false);
  } catch (e) {
    console.log(e);
    setError(true);
  }
};

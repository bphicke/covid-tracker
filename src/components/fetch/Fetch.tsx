import { useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { DataByCountry } from "../shared/types";

//TODO: cache date in local storage
const fetchData = async ({ setLoading, setError, setDataByCountry }: Props) => {
  try {
    const timeSeriesData = await axios(
      "https://pomber.github.io/covid19/timeseries.json",
      // "https://covidapi.info/api/v1/global/count",
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

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
  setDataByCountry: Dispatch<SetStateAction<DataByCountry>>;
};

export const FetchCovidData = (props: Props) => {
  useEffect(() => {
    fetchData(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

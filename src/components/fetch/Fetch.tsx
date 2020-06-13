import { useEffect, useContext, Dispatch } from "react";
import axios from "axios";
import { store, Action } from "../store/store";
import { actionTypes } from "../store/actions";

export type OneDayCovid = {
  confirmed: number;
  date: string;
};

export type ResponseData = Record<string, OneDayCovid[]>;
//TODO: cache date in local storage
const fetchData = async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: actionTypes.loading,
      payload: true,
    });
    const timeSeriesData = await axios(
      "https://pomber.github.io/covid19/timeseries.json",
      // "https://covidapi.info/api/v1/global/count",
    );
    dispatch({
      type: actionTypes.storeCovidData,
      // payload: { data: timeSeriesData.data, location: "global" },
      payload: timeSeriesData.data as ResponseData,
    });
    console.log(timeSeriesData);
    dispatch({
      type: actionTypes.loading,
      payload: false,
    });
  } catch {
    dispatch({
      type: actionTypes.error,
      payload: true,
    });
  }
};

export const FetchCovidData = () => {
  const { dispatch } = useContext(store);
  useEffect(() => {
    fetchData(dispatch!);
  }, [dispatch]);

  return null;
};

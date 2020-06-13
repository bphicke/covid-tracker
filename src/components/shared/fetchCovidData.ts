import axios from "axios";

export class GetCovidData {
  static fetchCovidData = async () => {
    await axios(
      "https://pomber.github.io/covid19/timeseries.json",
      // "https://covidapi.info/api/v1/global/count",
    );
  };

  static checkLocalStorage = () => {};

  static storeLocalStorage = () => {};
}

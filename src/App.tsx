import React, { useState, useEffect } from "react";
import "./App.css";
import { Typography, AppBar, Grid } from "@material-ui/core";
import { FetchCovidData } from "./components/fetch/Fetch";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";
import { ColorPicker } from "./components/colorPicker/ColorPicker";
import { DataByCountry, CountriesInputs } from "./components/shared/types";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [dataByCountry, setDataByCountry] = useState<DataByCountry>({});
  const [countryList, setCountryList] = useState<string[]>([]);
  const [countriesInputs, setCountriesInputs] = useState<CountriesInputs>({
    US: { selected: true },
  });
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2020-01-22T21:11:54"),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setCountryList(Object.keys(dataByCountry));
  }, [dataByCountry]);

  return (
    <>
      <AppBar position="static">
        <Typography variant="h4" component="h1" gutterBottom color="inherit">
          Covid Tracker
        </Typography>
      </AppBar>
      <FetchCovidData
        setLoading={setLoading}
        setError={setError}
        setDataByCountry={setDataByCountry}
      />
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" gutterBottom color="inherit">
            <Chart
              loading={loading}
              error={error}
              dataByCountry={dataByCountry}
              countriesInputs={countriesInputs}
              startDate={startDate}
              endDate={endDate}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>

        <CountryPicker
          countriesInputs={countriesInputs}
          setCountriesInputs={setCountriesInputs}
          countryList={countryList}
          loading={loading}
        />
        <ColorPicker
          countriesInputs={countriesInputs}
          setCountriesInputs={setCountriesInputs}
        />
      </Grid>
    </>
  );
}

export default App;

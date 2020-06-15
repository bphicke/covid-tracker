import React, { useState, useEffect } from "react";
import "./App.css";
import { Typography, AppBar, Grid, Tabs, Tab } from "@material-ui/core";
import { FetchCovidData } from "./components/fetch/Fetch";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";
import { ColorPicker } from "./components/colorPicker/ColorPicker";
import { DataByCountry, CountriesInputs } from "./components/shared/types";

function App() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
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

  const handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <AppBar position="static">
        <Typography variant="h4" component="h1" gutterBottom color="inherit">
          Covid Tracker
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Time-Series Graph" />
          <Tab label="Customize Colors" />
        </Tabs>
      </AppBar>
      <FetchCovidData
        setLoading={setLoading}
        setError={setError}
        setDataByCountry={setDataByCountry}
      />
      {selectedTab === 0 && (
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              color="inherit"
            >
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
          <Grid item xs={12}>
            <CountryPicker
              countriesInputs={countriesInputs}
              setCountriesInputs={setCountriesInputs}
              countryList={countryList}
              loading={loading}
            />
          </Grid>
        </Grid>
      )}
      {selectedTab === 1 && (
        <Grid container>
          <ColorPicker
            countriesInputs={countriesInputs}
            setCountriesInputs={setCountriesInputs}
          />
        </Grid>
      )}
    </>
  );
}

export default App;

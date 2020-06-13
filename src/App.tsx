import React, { useState } from "react";
import "./App.css";
import { Typography, AppBar, Container, Card } from "@material-ui/core";
import { FetchCovidData, OneDayCovid } from "./components/fetch/Fetch";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";

export type SelectedCountries = Record<string, boolean>;
export type DataByCountry = Record<string, OneDayCovid[]>;

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [dataByCountry, setDataByCountry] = useState<DataByCountry>({});
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountries>(
    {},
  );
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
      <Container maxWidth="sm">
        <Card>
          <Typography variant="h4" component="h2" gutterBottom color="inherit">
            <Chart
              loading={loading}
              error={error}
              dataByCountry={dataByCountry}
              selectedCountries={selectedCountries}
            />
          </Typography>
        </Card>
        <DateRangePicker />
        <CountryPicker
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      </Container>
    </>
  );
}

export default App;

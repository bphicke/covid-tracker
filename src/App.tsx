import React, { useState } from "react";
import "./App.css";
import { Typography, AppBar, Container, Card } from "@material-ui/core";
import { FetchCovidData } from "./components/fetch/Fetch";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";
import { ColorPicker } from "./components/colorPicker/ColorPicker";
import { DataByCountry, CountriesInputs } from "./components/shared/types";

// const filterCountries = (
//   dataByCountry: DataByCountry,
//   selectedCountries: SelectedCountries,
//   setFilteredCountries: Dispatch<SetStateAction<DataByCountry>>,
// ) => {
//   const filteredCountries: DataByCountry = {};
//   for (let key in selectedCountries) {
//     filteredCountries[key] = dataByCountry[key];
//   }
//   setFilteredCountries(filteredCountries);
// };

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [dataByCountry, setDataByCountry] = useState<DataByCountry>({});
  // const [filteredCountries, setFilteredCountries] = useState<DataByCountry>({});

  //refactored Inputs
  const [countriesInputs, setCountriesInputs] = useState<CountriesInputs>({
    US: { selected: true },
  });

  // useEffect(() => {
  //   filterCountries(dataByCountry, selectedCountries, setFilteredCountries);
  // }, [dataByCountry, selectedCountries]);

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
              countriesInputs={countriesInputs}
            />
          </Typography>
        </Card>
        <ColorPicker
          countriesInputs={countriesInputs}
          setCountriesInputs={setCountriesInputs}
        />
        <DateRangePicker />
        <CountryPicker
          countriesInputs={countriesInputs}
          setCountriesInputs={setCountriesInputs}
        />
      </Container>
    </>
  );
}

export default App;

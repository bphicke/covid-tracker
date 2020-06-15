import React, { useState, useEffect } from "react";
import "./App.css";
import { Typography, AppBar, Grid, Tabs, Tab, Box } from "@material-ui/core";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";
import { ColorPicker } from "./components/colorPicker/ColorPicker";
import { DataByCountry, CountriesInputs } from "./components/shared/types";
import { fetchData } from "./components/services/fetchCovidData";
import { TabContainer } from "./components/TabContainer/TabContainer";
import { Loading } from "./components/Loading/Loading";

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
    fetchData(setLoading, setError, setDataByCountry);
  }, []);

  useEffect(() => {
    setCountryList(Object.keys(dataByCountry));
  }, [dataByCountry]);

  const handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  //push tabs down
  if (error) return null;

  return (
    <>
      <AppBar position="static">
        <Grid container>
          <Box pl={3} pr={3}>
            <Typography variant="h4" component="h1" color="inherit">
              Covid Tracker
            </Typography>
          </Box>

          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Time-Series Graph" />
            <Tab label="Customize Colors" />
          </Tabs>
        </Grid>
      </AppBar>
      <Loading loading={loading}>
        <TabContainer selectedTab={selectedTab} tabIndex={0}>
          <Grid container spacing={3}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <Chart
                dataByCountry={dataByCountry}
                countriesInputs={countriesInputs}
                startDate={startDate}
                endDate={endDate}
              />
            </Grid>
          </Grid>
        </TabContainer>
        <TabContainer selectedTab={selectedTab} tabIndex={1}>
          <Grid container>
            <ColorPicker
              countriesInputs={countriesInputs}
              setCountriesInputs={setCountriesInputs}
            />
          </Grid>
        </TabContainer>
      </Loading>
    </>
  );
}

export default App;

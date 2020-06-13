import React, { useContext } from "react";
import "./App.css";
import { Typography, AppBar, Container, Card } from "@material-ui/core";
import { store } from "./components/store/store";
import { FetchCovidData } from "./components/fetch/Fetch";
import { Chart } from "./components/chart/Chart";
import { DateRangePicker } from "./components/dateRangePicker/DateRangePicker";
import { CountryPicker } from "./components/countryPicker/countryPicker";
function App() {
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <>
      <AppBar position="static">
        <Typography variant="h4" component="h1" gutterBottom color="inherit">
          Covid Tracker
        </Typography>
      </AppBar>
      <FetchCovidData />
      <Container maxWidth="sm">
        <Card>
          <Typography variant="h4" component="h2" gutterBottom color="inherit">
            <Chart />
          </Typography>
        </Card>
        <DateRangePicker />
        <CountryPicker />
      </Container>
    </>
  );
}

export default App;

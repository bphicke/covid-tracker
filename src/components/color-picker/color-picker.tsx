import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { TwitterPicker, ColorResult } from "react-color";
import { CountriesInputs } from "../shared/types";

const getFilteredKeys = (countriesInputs: CountriesInputs) => {
  return Object.keys(countriesInputs).filter((country) => {
    return countriesInputs[country]?.selected;
  });
};

const noCountriesSelected = (selectedCountries: string[]) => {
  return selectedCountries.length === 0;
};

type Props = {
  countriesInputs: CountriesInputs;
  setCountriesInputs: Dispatch<SetStateAction<CountriesInputs>>;
};

export const ColorPicker = ({ countriesInputs, setCountriesInputs }: Props) => {
  const [country, setSelectedCountry] = useState<string>("");

  const handleSelectColor = (colorResult: ColorResult) => {
    setCountriesInputs((prevState) => ({
      ...prevState,
      [country]: {
        ...prevState[country],
        color: colorResult,
      },
    }));
  };

  const handleCountryChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCountry(e.target.value as string);
  };

  const filteredKeys = getFilteredKeys(countriesInputs);

  if (noCountriesSelected(filteredKeys)) {
    return (
      <Grid container justify="space-around">
        <Box pt={3}>
          <Typography>
            Please select at least one country before customizing colors
          </Typography>
        </Box>
      </Grid>
    );
  }
  return (
    <>
      <Grid item xs={12}>
        <Box pl={3} pb={3}>
          <FormControl style={{ width: "300px" }}>
            <InputLabel id={"country-color-select-label"}>
              Select a country
            </InputLabel>
            <Select
              labelId={"country-color-select-label"}
              value={country}
              onChange={handleCountryChange}
            >
              {filteredKeys.map((country) => {
                return (
                  <MenuItem key={`${country}-color-select`} value={country}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      {country !== "" && (
        <Box pl={3}>
          <TwitterPicker
            /* @ts-expect-error color type not compatible with ColorResult. Possibly a bug. */
            color={countriesInputs[country]?.color}
            onChangeComplete={handleSelectColor}
          />
        </Box>
      )}
    </>
  );
};

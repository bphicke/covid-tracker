import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import {
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { TwitterPicker, ColorResult } from "react-color";
import { CountriesInputs } from "../shared/types";

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
  //TODO: only render color picker if a country is selected
  //TODO: if no countries are slected, direct them to select contries
  return (
    <Card>
      <FormControl>
        <InputLabel id={"country-color-select-label"}>
          Select a country
        </InputLabel>
        <Select
          labelId={"country-color-select-label"}
          value={country}
          onChange={handleCountryChange}
        >
          {Object.keys(countriesInputs)
            .filter((country) => {
              return countriesInputs[country]?.selected;
            })
            .map((country) => {
              return (
                <MenuItem key={`${country}-color-select`} value={country}>
                  {country}
                </MenuItem>
              );
            })}
        </Select>
        <TwitterPicker
          /* @ts-expect-error color type not compatible with ColorResult. Looks like a bug. */
          color={countriesInputs[country]?.color}
          onChangeComplete={handleSelectColor}
        />
      </FormControl>
    </Card>
  );
};

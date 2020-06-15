import React, { Dispatch, SetStateAction } from "react";
import { CountriesInputs } from "../shared/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

type Props = {
  countriesInputs: CountriesInputs;
  setCountriesInputs: Dispatch<SetStateAction<CountriesInputs>>;
  countryList: string[];
  loading: boolean;
};

export const CountryPicker = ({
  countriesInputs,
  setCountriesInputs,
  countryList,
  loading,
}: Props) => {
  if (loading) return null;

  return (
    <Autocomplete
      onChange={(_event, _selectedValues, action, value) => {
        console.log("action", action);
        if (action === "remove-option") {
          setCountriesInputs((prevState) => ({
            ...prevState,
            [value!.option]: {
              ...prevState[value!.option],
              selected: false,
            },
          }));
        }
        if (action === "select-option") {
          setCountriesInputs((prevState) => ({
            ...prevState,
            [value!.option]: {
              ...prevState[value!.option],
              selected: true,
            },
          }));
        }
      }}
      options={countryList}
      multiple
      autoHighlight
      filterSelectedOptions
      value={Object.keys(countriesInputs).filter(
        (country) => countriesInputs[country].selected,
      )}
      getOptionLabel={(option: string) => option}
      renderOption={(option: string) => <span>{option}</span>}
      renderInput={(params: unknown) => {
        console.log("params", params);
        return (
          <TextField
            {...params}
            label={"Choose a country"}
            variant="outlined"
          />
        );
      }}
    />
  );
};

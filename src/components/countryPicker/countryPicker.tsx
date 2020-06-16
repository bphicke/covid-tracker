import React, { Dispatch, SetStateAction } from "react";
import { CountriesInputs } from "../shared/types";
import Autocomplete, {
  AutocompleteChangeDetails,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

type Props = {
  countriesInputs: CountriesInputs;
  setCountriesInputs: Dispatch<SetStateAction<CountriesInputs>>;
  countryList: string[];
};

export const CountryPicker = ({
  countriesInputs,
  setCountriesInputs,
  countryList,
}: Props) => {
  const toggleSelected = (
    toggle: boolean,
    value: AutocompleteChangeDetails<string>,
  ) => {
    setCountriesInputs((prevState) => ({
      ...prevState,
      [value!.option]: {
        ...prevState[value!.option],
        selected: toggle,
      },
    }));
  };

  return (
    <Box pl={3} pr={3} data-testid="countryPicker">
      <Autocomplete
        onChange={(_event, _selectedValues, action, value) => {
          if (action === "remove-option") {
            toggleSelected(false, value!);
          }
          if (action === "select-option") {
            toggleSelected(true, value!);
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
          return (
            <TextField
              {...params}
              label={"Choose a country"}
              variant="outlined"
            />
          );
        }}
      />
    </Box>
  );
};

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { FormControlLabel, Checkbox, FormGroup, Card } from "@material-ui/core";
import { CountriesInputs } from "../shared/types";

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
  const handleToggleCountry = useCallback(
    (country: string) => () => {
      setCountriesInputs((prevState) => ({
        ...prevState,
        [country]: {
          ...prevState[country],
          selected: !prevState[country]?.selected,
        },
      }));
    },
    [setCountriesInputs],
  );

  if (loading) return null;

  return (
    <Card>
      <FormGroup row>
        {countryList.map((country) => (
          <FormControlLabel
            key={country}
            control={
              <Checkbox
                checked={!!countriesInputs[country]?.selected}
                onChange={handleToggleCountry(country)}
                name={country}
              />
            }
            label={country}
          />
        ))}
      </FormGroup>
    </Card>
  );
};

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { countryList } from "../shared/countryList";
import { FormControlLabel, Checkbox, FormGroup, Card } from "@material-ui/core";
import { CountriesInputs } from "../shared/types";

type Props = {
  countriesInputs: CountriesInputs;
  setCountriesInputs: Dispatch<SetStateAction<CountriesInputs>>;
};

export const CountryPicker = ({
  countriesInputs,
  setCountriesInputs,
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

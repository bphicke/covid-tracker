import React, { Dispatch, SetStateAction } from "react";
import { countryList } from "../shared/countryList";
import { FormControlLabel, Checkbox, FormGroup, Card } from "@material-ui/core";
import { SelectedCountries } from "../../App";

type Props = {
  selectedCountries: SelectedCountries;
  setSelectedCountries: Dispatch<SetStateAction<SelectedCountries>>;
};

export const CountryPicker = ({
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const handleToggleCountry = (country: string) => () => {
    setSelectedCountries((prevState) => {
      console.log("prevState", prevState);
      return {
        ...prevState,
        [country]: !prevState[country],
      };
    });
  };

  return (
    <Card>
      <FormGroup row>
        {countryList.map((country) => (
          <FormControlLabel
            key={country}
            control={
              <Checkbox
                checked={!!selectedCountries[country]}
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

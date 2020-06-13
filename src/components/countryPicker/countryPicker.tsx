import React, { useState } from "react";
import { countryList } from "../shared/countryList";
import { FormControlLabel, Checkbox, FormGroup, Card } from "@material-ui/core";

export const CountryPicker = () => {
  const [selectedCountries, setSelectedCountries] = useState<
    Record<string, boolean>
  >({});
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

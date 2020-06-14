import { ColorResult } from "react-color";
export type OneDayCovid = {
  confirmed: number;
  date: string;
};
export type DataByCountry = Record<string, OneDayCovid[]>;

export type CountryInputs = {
  selected: boolean;
  color?: ColorResult;
};
export type CountriesInputs = Record<string, CountryInputs>;

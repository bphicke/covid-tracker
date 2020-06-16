import { DataByCountry, CountriesInputs } from "../../shared/types";
import { buildOptions } from "../helpers";

describe("buildOptions", () => {
  it("should build options", () => {
    const dataByCountry: DataByCountry = {
      US: [
        { confirmed: 1, date: "2020-1-21" },
        { confirmed: 2, date: "2020-1-22" },
        { confirmed: 3, date: "2020-1-23" },
        { confirmed: 4, date: "2020-1-24" },
        { confirmed: 5, date: "2020-4-22" },
        { confirmed: 6, date: "2020-4-23" },
      ],
    };
    const countriesInputs: CountriesInputs = { US: { selected: true } };
    const startDate: Date = new Date("2020-01-22T00:00:00");
    const endDate: Date = new Date("2020-04-22T00:00:00");
    const result = buildOptions(
      dataByCountry,
      countriesInputs,
      startDate,
      endDate,
    );
    const expected = {
      credits: {
        enabled: false,
      },
      series: [
        { color: undefined, data: [2, 3, 4, 5], name: "US", type: "line" },
      ],
      title: { text: "Confirmed Covid-19 Cases" },
      xAxis: {
        categories: ["2020-1-22", "2020-1-23", "2020-1-24", "2020-4-22"],
        title: {
          text: "Date",
        },
      },
      yAxis: {
        title: {
          text: "Confirmed Cases",
        },
      },
    };
    expect(result).toEqual(expected);
  });
});

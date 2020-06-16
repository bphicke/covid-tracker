import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import App from "../App";
import axiosMock from "axios";

const mockData = {
  data: {
    US: [
      { confirmed: 1, date: "2020-1-21" },
      { confirmed: 2, date: "2020-1-22" },
      { confirmed: 3, date: "2020-1-23" },
      { confirmed: 4, date: "2020-1-24" },
      { confirmed: 5, date: "2020-4-22" },
      { confirmed: 6, date: "2020-4-23" },
    ],
  },
};

describe("App", () => {
  afterAll(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("should render loading on page load", async () => {
    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByTestId } = render(<App />);
    const loading = getByTestId("loading");
    expect(loading).toBeVisible();
    await waitForElement(() => getByTestId("table"));
  });

  it("should load a chart after fetching data", async () => {
    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByText } = render(<App />);
    const resolvedChart = await waitForElement(() =>
      getByText("Confirmed Covid-19 Cases"),
    );
    expect(resolvedChart).toBeVisible();
  });

  it("should load a table after fetching data", async () => {
    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByTestId } = render(<App />);
    const resolvedTable = await waitForElement(() => getByTestId("table"));
    expect(resolvedTable).toBeVisible();
    expect(resolvedTable).toHaveTextContent("2020-1-23");
  });

  it("should load a date range picker after fetching data", async () => {
    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByTestId } = render(<App />);
    const dateRangePicker = await waitForElement(() =>
      getByTestId("dateRangePicker"),
    );
    expect(dateRangePicker).toBeVisible();
  });

  it("should render a date range picker after switching tabs", async () => {
    // @ts-ignore
    axiosMock.get.mockResolvedValueOnce(mockData);

    const { getByTestId, getByText } = render(<App />);
    await waitForElement(() => getByTestId("dateRangePicker"));
    fireEvent.click(getByText("Customize Colors"));
    const colorSelector = getByText("Select a country");
    expect(colorSelector).toBeVisible();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MenuItemType } from "utils/types";
const view: MenuItemType = {
  name: "Month",
  value: "Month",
};
describe("App.js Component", () => {
  test("it should render with a default view which is week", () => {
    render(<App />);

    const dropDownButton = screen.getByRole("button", {
      name: /Week/i,
    });

    const weekViewTable = screen.getByLabelText("week_view_table");
    expect(dropDownButton).toBeInTheDocument();
    expect(weekViewTable).toBeInTheDocument();
  });

  test("it should not render month and daily view if week is in view", () => {
    render(<App />);

    const dropDownButton = screen.getByRole("button", {
      name: /Week/i,
    });
    const weekViewTable = screen.getByLabelText("week_view_table");
    const dayViewTable = screen.queryByLabelText("day_view_table");
    const monthView = screen.queryByLabelText("month_view_component");

    expect(dropDownButton).toBeInTheDocument();
    expect(weekViewTable).toBeInTheDocument();
    expect(dayViewTable).not.toBeInTheDocument();
    expect(monthView).not.toBeInTheDocument();
  });
  test("it renders month view if it is selected", () => {
    render(<App defaultView={view} />);

    const dropDownButton = screen.getByRole("button", {
      name: /Month/i,
    });

    const monthView = screen.getByLabelText("month_view_component");

    expect(dropDownButton).toBeInTheDocument();

    expect(monthView).toBeInTheDocument();
  });
});

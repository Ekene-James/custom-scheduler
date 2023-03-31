import { queryByAttribute, render } from "@testing-library/react";

import DayView from "./DayView";

const apiData = [
  {
    id: 1,
    title: "Things Fall Apart",
    startDate: new Date("3/1/2023"),
    endDate: new Date("3/1/2023"),
    startTime: "7:00",
    endTime: "8:00",
    clientImg:
      "/imgs/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg",
    clientName: "Ajuri Alaka",
    appointmentWith: "Dr.Samie Ejor",
    appointmentWithId: "dc-1",
    appointmentWithImg: "/imgs/images (1).jpg",
  },
  {
    id: 2,
    title: "Half of a Yellow Sun",
    startDate: new Date("3/22/2023"),
    endDate: new Date("3/22/2023"),
    startTime: "7:00",
    endTime: "8:00",
    clientImg: "/imgs/images.jpg",
    clientName: "Janet Dope",
    appointmentWith: "Dr.Justin Land",
    appointmentWithId: "dc-2",
    appointmentWithImg: "/imgs/istockphoto-1067347086-612x612.jpg",
  },
];
const currentDay = new Date("3/1/2023");

const dayNotInTheApi = new Date("11/19/2023");
const interval = 7;
const getById = queryByAttribute.bind(null, "id");

describe("Day view component", () => {
  test("should render a cell component if the api date matches the currently selected date", () => {
    const view = render(<DayView apiData={apiData} currentDay={currentDay} />);

    const cellComponentForSelectedDay = getById(
      view.container,
      `day_cell_for_${interval}`
    );

    expect(cellComponentForSelectedDay).toBeInTheDocument();
  });
  test("should not render a cell component if the currently selected date is not in the api", () => {
    const view = render(
      <DayView apiData={apiData} currentDay={dayNotInTheApi} />
    );
    const cellComponentForSelectedDay = getById(
      view.container,
      `day_cell_for_${interval}`
    );

    expect(cellComponentForSelectedDay).not.toBeInTheDocument();
  });
});

export {};

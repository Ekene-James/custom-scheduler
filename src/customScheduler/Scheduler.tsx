import React from "react";
import DayView from "./day/DayView";
import MonthlyView from "./monthlyView/MonthlyView";
import WeekViewScheduler from "./weekView/WeekViewScheduler";
import { ApiDataObject, View } from "utils/types";

interface Props {
  view: View;
  apiData: ApiDataObject[];
  currentDay: Date;
}

/**Component that displays the currently selected view
 * @description
 * Displays the different types of schedulers depending on value of view selected using switch statement.
 * @param Props interface - The components props
 **/

function Scheduler({ view, currentDay, apiData }: Props) {
  let schedule;
  switch (view) {
    case "Week":
      schedule = (
        <WeekViewScheduler apiData={apiData} currentDay={currentDay} />
      );
      break;
    case "Day":
      schedule = <DayView apiData={apiData} currentDay={currentDay} />;
      break;
    case "Month":
      schedule = <MonthlyView apiData={apiData} currentDay={currentDay} />;
      break;

    default:
      break;
  }
  return <>{schedule}</>;
}

export default Scheduler;

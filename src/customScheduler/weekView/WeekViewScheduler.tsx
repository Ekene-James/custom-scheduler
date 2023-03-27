import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import React from "react";
import Row from "./Row";
import { times } from "../../utils/staticData";
import TableTop from "./TableTop";

import { ApiDataObject } from "utils/types";
import { daysOfThWeek } from "utils/utilFuncs";

interface Props {
  apiData: ApiDataObject[];
  currentDay: Date;
}
/**
 * Parent component of the Weekly view
 * @description
 * For Table top that contains The day, date and month,
 * Used @function daysOfThWeek(currentDay) to get array of dates
 * starting from the current day passed from the date component,
 * Then set this array to state.
 *
 * @param Props
 * @returns Jsx Element
 */
function WeekViewScheduler({ apiData, currentDay }: Props) {
  const [weekDays, setweekDays] = React.useState<Date[]>([]);

  React.useMemo(() => setweekDays(daysOfThWeek(currentDay)), [currentDay]);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, overflow: "hidden" }}
        aria-label="week_view_table"
      >
        {weekDays?.length ? (
          <>
            <TableTop data={weekDays} />
            <TableBody>
              {times.map((row) => (
                <Row
                  key={row.militaryTime}
                  time={row}
                  weekDays={weekDays}
                  apiData={apiData}
                />
              ))}
            </TableBody>
          </>
        ) : null}
      </Table>
    </TableContainer>
  );
}

export default WeekViewScheduler;

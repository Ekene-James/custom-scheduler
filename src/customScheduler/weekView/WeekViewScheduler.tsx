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

function WeekViewScheduler({ apiData, currentDay }: Props) {
  const [weekDays, setweekDays] = React.useState<Date[]>([]);

  React.useMemo(() => setweekDays(daysOfThWeek(currentDay)), [currentDay]);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, overflow: "hidden" }}
        aria-label="simple table"
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

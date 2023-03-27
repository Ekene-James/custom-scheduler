import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

import React from "react";
import Row from "./Row";

import TableTop from "./TableTop";

import { ApiDataObject } from "utils/types";
import { groupBy } from "utils/utilFuncs";

interface Props {
  apiData: ApiDataObject[];
  currentDay: Date;
}

/**
 * The first parent of the day view, which is a MUI table with head and body
 * @param Props
 * @returns Jsx Element
 */
function DayView({ apiData = [], currentDay }: Props): JSX.Element {
  /**
   * @description
   * In day view unlike other views, a doctor can have multiple appointments attributed to his name
   * situated at the left side of the scheduler,
   * there is a need to group the api data according to the 'appointmentWithId'
   * @returns Object object of ApiDataObject
   * @example
   * {
   * 'doctorId': object of ApiDataObject
   * }
   */
  const groupedData = groupBy(apiData, "appointmentWithId");
  return (
    <>
      {apiData.length ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, borderCollapse: "separate", p: 4, pl: 0 }}
            aria-label="day_view_table"
          >
            <TableTop />
            <TableBody>
              {Object.keys(groupedData).map((key) => (
                <Row
                  key={key}
                  data={groupedData[key]}
                  currentDay={currentDay}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography p={4}>No data to display</Typography>
      )}
    </>
  );
}

export default DayView;

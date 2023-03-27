import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { ApiDataObject } from "utils/types";
import { currentDayShift } from "utils/utilFuncs";

import { cellWidth, timeWithInterval } from "../../utils/staticData";
import CellType from "./Celltype";

interface Props {
  data: ApiDataObject[];
  currentDay: Date;
}

/**
 * Table row of the day view.
 * @description
 * Get all the current day shifts,
 * Get the api day from any item in the shifts object array,
 * Check if the current day matches the day from the api,
 * return jsx for the cell component
 *
 * @param Props
 * @returns Jsx Element
 *
 */
const Row = ({ data, currentDay }: Props): JSX.Element => {
  const day = new Date(currentDay).getDate();
  const shifts = currentDayShift(day, data);

  let apiDay = 0;
  if (shifts.length) apiDay = new Date(shifts[0].startDate).getDate();

  return (
    <TableRow
      sx={{
        position: "relative",
      }}
    >
      {apiDay === day ? (
        <>
          <TableCell
            component="th"
            scope="row"
            align="left"
            sx={{
              minWidth: "150px !important",
              borderBottom: "none",
              pt: 0.5,
              pb: 0.5,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                alignItems: "center",
                backgroundColor: "skyblue",
              }}
            >
              <img
                style={{ height: "100%", width: "30px" }}
                src={data[0].appointmentWithImg}
                alt="docs_img"
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontSize: "0.67rem" }}
              >
                {data[0].appointmentWith}
              </Typography>
            </Stack>
          </TableCell>
          {timeWithInterval.map((interval) => (
            <TableCell
              key={interval.militaryTime}
              component="th"
              scope="row"
              align="left"
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                minWidth: cellWidth,
                position: "relative",
              }}
            >
              <CellType interval={interval.militaryTime} shifts={shifts} />
            </TableCell>
          ))}
        </>
      ) : null}
    </TableRow>
  );
};

export default Row;

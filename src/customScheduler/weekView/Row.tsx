import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { cellHeight } from "../../utils/staticData";

import Cell from "./Cell";
import { ApiDataObject, TimeType } from "utils/types";

interface Props {
  weekDays: Date[];
  time: TimeType;
  apiData: ApiDataObject[];
}

const Row = ({ time, weekDays = [], apiData }: Props) => {
  return (
    <TableRow
      sx={{
        height: cellHeight,
        position: "relative",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        align="left"
        sx={{ border: "1px solid rgba(224, 224, 224, 1)", width: "50px" }}
      >
        {time.normalTime}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
            zIndex: 0,
          },
        }}
      >
        <Cell weekDay={weekDays[0]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[1]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[2]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[3]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[4]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[5]} time={time} apiData={apiData} />
      </TableCell>
      <TableCell
        align="left"
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          position: "relative",
          "&::before": {
            content: '" "',
            top: "50%",
            left: "0%",
            height: "1px",
            width: "100%",
            backgroundColor: "rgba(224, 224, 224, 1)",
            position: "absolute",
          },
        }}
      >
        <Cell weekDay={weekDays[6]} time={time} apiData={apiData} />
      </TableCell>
    </TableRow>
  );
};

export default Row;

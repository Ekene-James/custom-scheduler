import React from "react";
import CellComponent from "./Cell";
import { cellHeight, daysFromSunday, months } from "../../utils/staticData";
import { ApiDataObject } from "utils/types";

const { Box, Typography } = require("@mui/material");

interface Props {
  day: Date;
  apiData: ApiDataObject[];
}

const Row = ({ day, apiData }: Props): JSX.Element => {
  const todaysDate: Date = new Date();

  const isToday = todaysDate.getDate() === day.getDate();

  return (
    <Box
      sx={{
        width: "100%",
        height: cellHeight,
      }}
    >
      <Typography sx={{ fontWeight: isToday ? "bold" : 400 }}>
        {daysFromSunday[day.getDay()]} {day.getDate()} {months[day.getMonth()]}
      </Typography>
      <CellComponent weekDay={day} apiData={apiData} />
    </Box>
  );
};

export default Row;

import { Box, Grid } from "@mui/material";

import React from "react";
import Row from "./Row";

import TableTop from "./TableTop";
import { fillMissingDaysInMonth } from "../../utils/utilFuncs";
import { ApiDataObject } from "utils/types";

interface Props {
  apiData: Array<ApiDataObject>;
  currentDay: Date;
}

const MonthlyView = ({ apiData, currentDay }: Props): JSX.Element => {
  const [monthDays, setmonthDays] = React.useState<Date[]>([]);
  const todaysDate: Date = new Date();
  React.useMemo(
    () =>
      setmonthDays(
        fillMissingDaysInMonth(
          currentDay?.getMonth(),
          currentDay?.getFullYear()
        )
      ),
    [currentDay]
  );

  return (
    <Box sx={{ minWidth: 700, width: "100%", overflow: "hidden" }}>
      <TableTop />
      <Grid
        container
        spacing={0}
        sx={{ m: 0, p: 0, pl: 1, pb: 1, width: "100%" }}
      >
        {monthDays.map((row, i) => (
          <Grid
            item
            xs={1.7}
            key={i}
            sx={{
              border:
                todaysDate.getDate() === row.getDate()
                  ? "2px solid skyblue"
                  : "1px solid rgba(0,0,0,0.3)",
              p: 0.5,
              opacity: row.getMonth() === currentDay.getMonth() ? 1 : 0.4,
            }}
          >
            <Row day={row} apiData={apiData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MonthlyView;

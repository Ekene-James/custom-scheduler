import { Stack, Typography } from "@mui/material";
import { daysFromSunday } from "utils/staticData";
/**
 * Top caption for days Monthly view
 * @description
 * Loops through daysFromSunday array and displays Sun,Mon,Tue, and e.t.c.
 *
 * @returns Jsx Element
 */
const TableTop = (): JSX.Element => {
  const todaysDate: Date = new Date();

  return (
    <Stack
      sx={{ width: "100%" }}
      direction="row"
      justifyContent={"space-between"}
      spacing={1}
      p={2}
    >
      {daysFromSunday.map((day, i) => (
        <Typography
          variant="caption"
          sx={{
            fontWeight: todaysDate.getDay() === i ? "bold" : 400,
            opacity: todaysDate.getDay() === i ? 1 : 0.7,
          }}
          key={day}
        >
          {day}
        </Typography>
      ))}
    </Stack>
  );
};
export default TableTop;

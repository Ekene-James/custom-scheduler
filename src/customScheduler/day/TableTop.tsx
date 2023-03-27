import { TableCell, TableHead, TableRow } from "@mui/material";
import { timeWithInterval } from "utils/staticData";
/**
 * Day view Table Header element
 * @description normal time intervals are used as table heads
 * @returns Jsx Element
 */
const TableTop = (): JSX.Element => {
  return (
    <TableHead>
      <TableRow sx={{}}>
        <TableCell sx={{ border: "none" }} />

        {timeWithInterval.map((time) => (
          <TableCell key={time.militaryTime} align="center">
            {time.normalTime}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableTop;

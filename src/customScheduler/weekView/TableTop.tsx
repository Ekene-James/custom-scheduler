import {
  Stack,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { days, months } from "utils/staticData";

interface Props {
  data: Date[];
}

const TableTop = ({ data = [] }: Props) => {
  const today = new Date();

  return (
    <TableHead>
      <TableRow sx={{}}>
        <TableCell />

        {data.map((day, i) => (
          <TableCell key={i} align="center">
            <Stack
              direction="column"
              spacing={1}
              width={"100%"}
              justifyContent="start"
              alignItems="center"
              p={0.5}
              sx={{ opacity: +day.getDate() === +today.getDate() ? 1 : 0.6 }}
            >
              <Typography variant="caption" sx={{ opacity: "inherit" }}>
                {days[i]}
              </Typography>
              <Stack
                direction="row"
                spacing={0.2}
                alignItems="flex-end"
                justifyContent="flex-end"
                sx={{
                  opacity: +day.getDate() === +today.getDate() ? 1 : 0.6,
                }}
              >
                <Typography variant="h5" sx={{ opacity: "inherit" }}>
                  {day.getDate()}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: "flex-end",
                    justifySelf: "flex-end",
                    opacity: "inherit",
                  }}
                >
                  {months[day.getMonth()]}
                </Typography>
              </Stack>
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default TableTop;
